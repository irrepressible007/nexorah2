<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeaturedFeed extends Model
{
    use HasFactory;
    
    protected $guarded = [];

    public function comments()
    {
        return $this->hasMany(FeaturedFeedComment::class)->orderBy('created_at', 'desc');
    }
}
