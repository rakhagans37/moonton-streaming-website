<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Movies;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Admin\Movie\Store;
use App\Http\Requests\Admin\Movie\UpdateRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class MovieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Movies/Index', [
            'movies' => Movies::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Movies/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Store $request)
    {
        $data = $request->validated();
        $request->file('thumbnail')->store('movies');
        $data['thumbnail'] = Storage::disk('public')->put('movies', $request->file('thumbnail'));
        $slug= Str::slug($data['title']);

        $movie = new Movies();
        $movie->category = json_encode($data['category']);
        $movie->title = $data['title'];
        $movie->thumbnail = $data['thumbnail'];
        $movie->is_featured = $data['is_featured'];
        $movie->video_url = $data['video_url']; 
        $movie->rating = $data['rating'];
        $movie->slug = $slug;
        $movie->save();

        return redirect()->route('admin.dashboard.movie.index')->with([
            'message' => 'Movie created successfully.',
            'type' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Movies $movies)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Movies $movie)
    {
        return Inertia::render('Admin/Movies/Edit', [
            'movie' => $movie
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Movies $movie)
    {
        try {
            $data = $request->validated();
            
            if($request->hasFile('thumbnail')) {
                Storage::disk('public')->delete($movie->thumbnail);
                $data['thumbnail'] = Storage::disk('public')->put('movies', $request->file('thumbnail'));
                $movie->thumbnail = $data['thumbnail'];
            } else {
                $data['thumbnail'] = $movie->thumbnail;
            }
            $movie->title = $data['title'];
            $movie->slug = Str::slug($data['title']);
            $movie->category = json_encode($data['category']);
            $movie->is_featured = $data['is_featured'];
            $movie->video_url = $data['video_url'];
            $movie->rating = $data['rating'];
            $movie->save();
    
            return redirect()->route('admin.dashboard.movie.index')->with([
                'message' => 'Movie updated successfully.',
                'type' => 'success',
            ]);
        } catch (\Throwable $th) {
            return redirect()->route('admin.dashboard.movie.index')->with([
                'message' => 'Movie updated failed.',
                'type' => 'failed',
            ]);
        }
       
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movies $movie)
    {
        $movie->delete();
        return redirect()->route('admin.dashboard.movie.index')->with([
            'message' => 'Movie deleted successfully.',
            'type' => 'success',
        ]);
    }
}
