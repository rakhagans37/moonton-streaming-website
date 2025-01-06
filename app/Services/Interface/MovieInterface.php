<?php

namespace App\Services\Interface;

use Illuminate\Database\Eloquent\Collection;

interface MovieInterface
{
    public function getMovieWithBookmark(): Collection | null;
    public function getAllMovieWithUserBookmark(): Collection | null;
    public function getAllFeaturedMovieWithUserBookmark(): Collection | null;
}