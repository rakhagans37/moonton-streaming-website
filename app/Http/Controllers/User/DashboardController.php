<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Movies;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    function index() {
        $userId = Auth::id();

        $featuredMovie = Movies::with(['bookmarks' => function($query) use ($userId) {
            $query->where('user_id', $userId);
        }])->where('is_featured', 1)->get();

        $movies = Movies::with(['bookmarks' => function($query) use ($userId) {
            $query->where('user_id', $userId);
        }])->get();

        return Inertia::render('User/Dashboard/Index', [
            'featuredMovies' => $featuredMovie,
            'movies' => $movies,
        ]);
    }
}
