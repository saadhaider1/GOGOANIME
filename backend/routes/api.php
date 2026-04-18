<?php

use App\Http\Controllers\WatchlistController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('watchlist', WatchlistController::class)->only(['index', 'store', 'destroy']);
});
