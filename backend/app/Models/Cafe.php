<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cafe extends Model
{
    protected $fillable = [
        'category_id',
        'name',
        'address',
        'description',
        'latitude',
        'longitude',
        'opening_hours',
        'price_range',
        'rating',
        'wifi',
        'parking',
        'photo',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}