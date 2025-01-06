<?php

namespace App\Services\Interface;

use App\Models\Movies;

interface BookmarkInterface
{
    public function createBookmark(Movies $movies): void;
    public function deleteBookmark(Movies $movies): void;
}