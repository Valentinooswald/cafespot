<?php

namespace App\Http\Controllers;

use App\Models\Cafe;
use Illuminate\Http\Request;

class CafeController extends Controller
{
    /**
     * Menampilkan semua cafe
     */
    public function index()
    {
        return response()->json(
            Cafe::with('category')->latest()->get()
        );
    }

    /**
     * Menyimpan cafe baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required',
            'address' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
        ]);

        $cafe = Cafe::create($request->all());

        return response()->json([
            'message' => 'Cafe berhasil ditambahkan',
            'data' => $cafe
        ], 201);
    }

    /**
     * Menampilkan detail cafe
     */
    public function show(Cafe $cafe)
    {
        return response()->json(
            $cafe->load('category')
        );
    }

    /**
     * Update cafe
     */
    public function update(Request $request, Cafe $cafe)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required',
            'address' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
        ]);

        $cafe->update($request->all());

        return response()->json([
            'message' => 'Cafe berhasil diupdate',
            'data' => $cafe
        ]);
    }

    /**
     * Hapus cafe
     */
    public function destroy(Cafe $cafe)
    {
        $cafe->delete();

        return response()->json([
            'message' => 'Cafe berhasil dihapus'
        ]);
    }
}