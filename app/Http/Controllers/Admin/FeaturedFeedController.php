<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FeaturedFeed;
use App\Models\FeaturedFeedComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FeaturedFeedController extends Controller
{
    public function index()
    {
        $feeds = FeaturedFeed::withCount('comments')->orderBy('created_at', 'desc')->paginate(10);
        return Inertia::render('Admin/FeaturedFeeds/Index', [
            'feeds' => $feeds
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/FeaturedFeeds/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'image' => 'nullable|image|max:10240',
            'is_active' => 'boolean'
        ]);

        $feed = new FeaturedFeed();
        $feed->content = $validated['content'];
        $feed->is_active = $request->boolean('is_active', true);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('featured_feeds', 'public');
            $feed->image_path = '/storage/' . $path;
        }

        $feed->save();

        return redirect()->route('admin.featured-feeds.index')->with('success', 'Featured Feed post created successfully.');
    }

    public function edit(FeaturedFeed $featuredFeed)
    {
        return Inertia::render('Admin/FeaturedFeeds/Form', [
            'feed' => $featuredFeed
        ]);
    }

    public function update(Request $request, FeaturedFeed $featuredFeed)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'image' => 'nullable|image|max:10240',
            'is_active' => 'boolean'
        ]);

        $featuredFeed->content = $validated['content'];
        $featuredFeed->is_active = $request->boolean('is_active', true);

        if ($request->hasFile('image')) {
            if ($featuredFeed->image_path) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $featuredFeed->image_path));
            }
            $path = $request->file('image')->store('featured_feeds', 'public');
            $featuredFeed->image_path = '/storage/' . $path;
        }

        $featuredFeed->save();

        return redirect()->route('admin.featured-feeds.index')->with('success', 'Featured Feed post updated successfully.');
    }

    public function destroy(FeaturedFeed $featuredFeed)
    {
        if ($featuredFeed->image_path) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $featuredFeed->image_path));
        }
        
        $featuredFeed->delete();
        
        return redirect()->route('admin.featured-feeds.index')->with('success', 'Featured Feed post deleted successfully.');
    }
}
