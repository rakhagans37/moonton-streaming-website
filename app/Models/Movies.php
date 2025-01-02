<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Movies extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'release_date',
        'rating',
        'ticket_price',
        'country',
        'genre',
        'photo',
    ];

    public function bookmarks() : HasMany
    {
        return $this->hasMany(Bookmark::class, 'movies_id', 'id');
    }
}
