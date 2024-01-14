<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use DateTime;
use Google\Cloud\Core\Duration;
use Inertia\Inertia;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\Cast\Object_;

use function PHPSTORM_META\map;

class UserController extends Controller
{

    protected $database;
    protected $storage;

    public function __construct()
    {
        $this->database = \App\Services\FirebaseService::connect();
        $this->storage = \App\Services\FirebaseService::createStorage();
    }

    public function index()
    {

        $snapshots = $this->database->getReference('customer')->orderByKey()->limitToFirst(10)->getSnapshot()->getValue();


        return inertia('Users/Index', [
            'users' => $snapshots,
        ]);
    }



    public function product()
    {

        $snapshots = $this->database->getReference('products')->orderByKey()->limitToFirst(10)->getSnapshot()->getValue();
        return Inertia::render('Users/Product', ['users' => $snapshots]);
    }

    public function productStore(Request $request)
    {

        $image = $request->file('image');
        $localfolder = public_path('firebase-temp-uploads') . '/';
        $name = $image->getClientOriginalName();
        $extension = $image->getClientOriginalExtension();
        $file = $name . '.' . $extension;
        $expired_at = new DateTime('+1 month');

        if ($image->move($localfolder, $file)) {
            $uploadedfile = fopen($localfolder . $file, 'r');
            $postImage = $this->storage->getBucket()->upload($uploadedfile, ['name' => 'product-image/' . $file]);
            unlink($localfolder . $file);


            $url = $postImage->signedUrl($expired_at);

            $postData = [
                'name' => $request->name,
                'desc' => $request->desc,
                'price' => $request->price,
                'weight' => $request->weight,
                'image' => $url
            ];
            $postRef = $this->database->getReference('products')->push($postData);
        }
        return back()->with([
            'type' => 'success',
            'message' => 'User has been updated',
        ]);
    }

    public function store(UserRequest $request)
    {


        $postData = [
            'username' => $request->username,
            'name' => $request->name,
            'password' => $request->password,
            'address' => $request->address,
            'email' => $request->email,
        ];


        $postRef = $this->database->getReference('customer')->push($postData);

        return back()->with([
            'type' => 'success',
            'message' => 'User has been updated',
        ]);
    }

    public function update(UserRequest $request, User $user)
    {
        $attr = $request->toArray();

        $user->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'User has been updated',
        ]);
    }

    public function destroy(User $user)
    {
        $this->database->getReference('customer')->remove();

        return back()->with([
            'type' => 'success',
            'message' => 'User has been deleted',
        ]);
    }
}
