<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeaturedFeedComment extends Model
{
    use HasFactory;
    
    protected $guarded = [];

    public function featuredFeed()
    {
        return $this->belongsTo(FeaturedFeed::class);
    }
}
