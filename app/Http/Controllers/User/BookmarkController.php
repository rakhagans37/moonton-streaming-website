<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Movies;
use App\Services\Interface\BookmarkInterface;
use App\Services\Interface\MovieInterface;
use Inertia\Inertia;

class BookmarkController extends Controller
{
    protected $bookmarkService;
    protected $movieService;

    public function __construct(BookmarkInterface $bookmarkService, MovieInterface $movieService)
    {
        $this->bookmarkService = $bookmarkService;
        $this->movieService = $movieService;
    }

    public function index()
    {
        $bookmarks = $this->movieService->getMovieWithBookmark();

        return Inertia::render('User/Dashboard/Bookmark', [
            'bookmarks' => $bookmarks
        ]);
    }

    public function store(Movies $movie)
    {
        $this->bookmarkService->createBookmark($movie);
        return redirect()->back();
    }

    public function destroy(Movies $movie)
    {
        $this->bookmarkService->deleteBookmark($movie);
        return redirect()->back();
    }
}
