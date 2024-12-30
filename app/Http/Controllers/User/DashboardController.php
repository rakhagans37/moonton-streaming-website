<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Movies;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    function index() {
        $featuredMovie = Movies::where('is_featured', 1)->get();
        $movies = Movies::all();

        return Inertia::render('User/Dashboard/Index', [
            'featuredMovies' => $featuredMovie,
            'movies' => $movies
        ]);
    }
}
