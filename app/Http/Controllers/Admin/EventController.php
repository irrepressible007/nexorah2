<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventMedia;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::latest()->paginate(10);
        return Inertia::render('Admin/Events/Index', [
            'events' => $events
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Events/Form', [
            'event' => new Event(),
            'gallery' => []
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'status' => 'required|in:draft,upcoming,past',
            'registration_link' => 'nullable|url|max:2000',
            'ambassador_link' => 'nullable|url|max:2000',
            'volunteer_link' => 'nullable|url|max:2000',
            'cover_image_file' => 'nullable|image|max:5120',
            'gallery_images.*' => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('cover_image_file')) {
            $path = $request->file('cover_image_file')->store('events', 'public');
            $validated['cover_image'] = '/storage/' . $path;
        }
        
        unset($validated['cover_image_file']);
        unset($validated['gallery_images']);

        $validated['slug'] = Str::slug($validated['title']);

        $event = Event::create($validated);

        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images') as $file) {
                $path = $file->store('events/gallery', 'public');
                $event->media()->create([
                    'file_path' => '/storage/' . $path,
                    'type' => 'image'
                ]);
            }
        }

        return redirect()->route('admin.events.index')->with('success', 'Event created successfully.');
    }

    public function edit(Event $event)
    {
        $event->load('media');
        return Inertia::render('Admin/Events/Form', [
            'event' => $event,
            'gallery' => $event->media
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'event_date' => 'nullable|date',
            'location' => 'nullable|string|max:255',
            'status' => 'required|in:draft,upcoming,past',
            'registration_link' => 'nullable|url|max:2000',
            'ambassador_link' => 'nullable|url|max:2000',
            'volunteer_link' => 'nullable|url|max:2000',
            'cover_image_file' => 'nullable|image|max:5120',
            'gallery_images.*' => 'nullable|image|max:5120',
        ]);

        if ($request->hasFile('cover_image_file')) {
            if ($event->cover_image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $event->cover_image));
            }
            $path = $request->file('cover_image_file')->store('events', 'public');
            $validated['cover_image'] = '/storage/' . $path;
        }

        unset($validated['cover_image_file']);
        unset($validated['gallery_images']);

        $validated['slug'] = Str::slug($validated['title']);

        $event->update($validated);

        if ($request->hasFile('gallery_images')) {
            foreach ($request->file('gallery_images') as $file) {
                $path = $file->store('events/gallery', 'public');
                $event->media()->create([
                    'file_path' => '/storage/' . $path,
                    'type' => 'image'
                ]);
            }
        }

        return redirect()->route('admin.events.index')->with('success', 'Event updated successfully.');
    }

    public function destroy(Event $event)
    {
        if ($event->cover_image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $event->cover_image));
        }
        foreach ($event->media as $media) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $media->file_path));
        }
        $event->delete();
        return redirect()->route('admin.events.index')->with('success', 'Event deleted successfully.');
    }

    public function destroyMedia(EventMedia $media)
    {
        Storage::disk('public')->delete(str_replace('/storage/', '', $media->file_path));
        $media->delete();
        return back()->with('success', 'Image removed from gallery.');
    }
}
