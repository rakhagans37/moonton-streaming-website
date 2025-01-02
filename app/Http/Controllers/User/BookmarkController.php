<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
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
}
