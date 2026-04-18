<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Watchlist extends Model
{
    protected $fillable = [
        'user_id',
        'mal_id',
        'title',
        'image_url',
        'type',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
