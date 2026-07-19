<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CafeController;

Route::apiResource('categories', CategoryController::class);
Route::apiResource('cafes', CafeController::class);