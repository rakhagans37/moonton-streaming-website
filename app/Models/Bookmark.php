<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bookmark extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'movies_id'];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function movie() : BelongsTo
    {
        return $this->belongsTo(Movies::class, 'movies_id', 'id');
    }
}
