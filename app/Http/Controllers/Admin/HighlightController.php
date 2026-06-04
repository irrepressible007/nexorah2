<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Highlight;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class HighlightController extends Controller
{
    public function index()
    {
        $highlights = Highlight::orderBy('display_order')->get();
        return Inertia::render('Admin/Highlights/Index', [
            'highlights' => $highlights
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Highlights/Form', [
            'highlight' => new Highlight()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'display_order' => 'integer',
            'media_file' => 'required|file|mimes:jpeg,png,jpg,gif,svg,mp4,mov,avi,webm|max:20480', // 20MB max
        ]);

        $file = $request->file('media_file');
        $path = $file->store('highlights', 'public');
        
        // Determine media type
        $mime = $file->getMimeType();
        $mediaType = str_starts_with($mime, 'video/') ? 'video' : 'image';

        Highlight::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'display_order' => $validated['display_order'] ?? 0,
            'media_path' => '/storage/' . $path,
            'media_type' => $mediaType,
        ]);

        return redirect()->route('admin.highlights.index')->with('success', 'Highlight added successfully.');
    }

    public function edit(Highlight $highlight)
    {
        return Inertia::render('Admin/Highlights/Form', [
            'highlight' => $highlight
        ]);
    }

    public function update(Request $request, Highlight $highlight)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'display_order' => 'integer',
            'media_file' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg,mp4,mov,avi,webm|max:20480',
        ]);

        $data = [
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'display_order' => $validated['display_order'] ?? 0,
        ];

        if ($request->hasFile('media_file')) {
            // Delete old media
            if ($highlight->media_path) {
                $oldPath = str_replace('/storage/', '', $highlight->media_path);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }
            
            $file = $request->file('media_file');
            $path = $file->store('highlights', 'public');
            
            $mime = $file->getMimeType();
            $data['media_type'] = str_starts_with($mime, 'video/') ? 'video' : 'image';
            $data['media_path'] = '/storage/' . $path;
        }

        $highlight->update($data);

        return redirect()->route('admin.highlights.index')->with('success', 'Highlight updated successfully.');
    }

    public function destroy(Highlight $highlight)
    {
        if ($highlight->media_path) {
            $oldPath = str_replace('/storage/', '', $highlight->media_path);
            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
        }
        
        $highlight->delete();
        return redirect()->route('admin.highlights.index')->with('success', 'Highlight deleted successfully.');
    }
}
