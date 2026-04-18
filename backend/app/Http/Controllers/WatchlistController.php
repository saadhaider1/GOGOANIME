<?php

namespace App\Http\Controllers;

use App\Models\Watchlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WatchlistController extends Controller
{
    public function index()
    {
        return Auth::user()->watchlists;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'mal_id' => 'required|integer',
            'title' => 'required|string',
            'image_url' => 'nullable|string',
            'type' => 'nullable|string',
        ]);

        $watchlist = Auth::user()->watchlists()->updateOrCreate(
            ['mal_id' => $validated['mal_id']],
            $validated
        );

        return response()->json($watchlist, 201);
    }

    public function destroy($mal_id)
    {
        Auth::user()->watchlists()->where('mal_id', $mal_id)->delete();

        return response()->json(null, 204);
    }
}
