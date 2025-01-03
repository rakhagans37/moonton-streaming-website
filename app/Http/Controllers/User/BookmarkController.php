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
        $bookmarks = Movies::whereHas('bookmarks', function ($query) {
            $query->where('user_id', Auth::user()->id);
        })->get();
        return Inertia::render('User/Dashboard/Bookmark', [
            'bookmarks' => count($bookmarks) > 0 ? $bookmarks : null
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

        return redirect()->back();
    }
}
