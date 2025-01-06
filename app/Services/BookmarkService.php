<?php

namespace App\Services;

use App\Models\Bookmark;
use App\Models\Movies;
use Illuminate\Support\Facades\Auth;
use App\Services\Interface\BookmarkInterface;


class BookmarkService implements BookmarkInterface
{
    public function createBookmark(Movies $movie): void
    {
        $user = Auth::user();
        $bookmark = Bookmark::firstOrCreate([
            'user_id' => $user->id,
            'movies_id' => $movie->id,
        ]);
    }

    public function deleteBookmark(Movies $movie): void
    {
        $user = Auth::user();
        Bookmark::where('user_id', $user->id)
            ->where('movies_id', $movie->id)
            ->delete();
    }
}