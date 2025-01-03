<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use App\Models\Movies;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookmarkController extends Controller
{
    public function index()
    {
        $bookmark = User::find(Auth::user()->id)->bookmarks->load('movie');
        return Inertia::render('User/Dashboard/Bookmark', [
            'bookmarks' => $bookmark
        ]);
    }

    public function store(Movies $movie)
    {

        $user = User::find(Auth::user()->id);
        $bookmark = new Bookmark();
        $bookmark->user_id = $user->id;
        $bookmark->movies_id = $movie->id;
        $bookmark->save();

        return redirect()->back();
    }

    public function destroy(Movies $movie)
    {
        $user = User::find(Auth::user()->id);
        $bookmark = Bookmark::where('user_id', $user->id)->where('movies_id', $movie->id)->first();
        $bookmark->delete();

        return redirect()->route('user.dashboard.index');
    }
}
