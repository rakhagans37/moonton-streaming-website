<?php

namespace App\Services;

use App\Models\Movies;
use App\Services\Interface\MovieInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;

class MovieService implements MovieInterface
{
    public function getMovieWithBookmark(): Collection | null
    {
        $bookmarks = Movies::whereHas('bookmarks', function ($query) {
            $query->where('user_id', Auth::id());
        })->get();

        return count($bookmarks) > 0 ? $bookmarks : null;
    }

    public function getAllMovieWithUserBookmark(): Collection | null
    {
        $movies = Movies::with(['bookmarks' => function ($query) {
            $query->where('user_id', Auth::id());
        }])->get();

        return count($movies) > 0 ? $movies : null;
    }

    public function getAllFeaturedMovieWithUserBookmark(): Collection | null
    {
        $movies = Movies::with(['bookmarks' => function ($query) {
            $query->where('user_id', Auth::id());
        }])->where('is_featured', 1)->get();

        return count($movies) > 0 ? $movies : null;
    }
}
