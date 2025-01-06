<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Services\Interface\MovieInterface;
use Inertia\Inertia;


class DashboardController extends Controller
{
    protected $movieService;

    public function __construct(MovieInterface $movieService)
    {
        $this->movieService = $movieService;
    }

    function index() {
        $featuredMovie = $this->movieService->getAllFeaturedMovieWithUserBookmark();
        $movies = $this->movieService->getAllMovieWithUserBookmark();

        return Inertia::render('User/Dashboard/Index', [
            'featuredMovies' => $featuredMovie,
            'movies' => $movies,
        ]);
    }
}
