<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::pluck('value', 'key')->toArray();
        
        // Define default settings if they don't exist
        $defaultSettings = [
            'homepage_title' => 'Experience The Grandeur',
            'homepage_subtitle' => 'Nexorah creates breathtaking, unforgettable events. Welcome to the next level of event management.',
            'homepage_cover_url' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
            'homepage_highlights_title' => 'Our Masterpieces',
            'homepage_highlights_subtitle' => 'A glimpse into our legendary events',
            'contact_email' => 'contact@nexorah.com',
            'contact_phone' => '+1 (555) 123-4567',
            'contact_address' => '123 Vice City Blvd, Neon District',
            'contact_page_title' => 'Establish Contact',
            'contact_page_subtitle' => 'Secure line to Nexorah Command. Send us your brief, inquiry, or partnership request.',
            'social_facebook' => 'https://facebook.com/nexorah',
            'social_twitter' => 'https://twitter.com/nexorah',
            'social_instagram' => 'https://instagram.com/nexorah',
            'social_linkedin' => 'https://linkedin.com/company/nexorah',
            'primary_color' => '#ec4899', // pink-500
        ];

        $settings = array_merge($defaultSettings, $settings);

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'homepage_title' => 'nullable|string|max:255',
            'homepage_subtitle' => 'nullable|string',
            'homepage_cover_url' => 'nullable|url|max:500',
            'homepage_highlights_title' => 'nullable|string|max:255',
            'homepage_highlights_subtitle' => 'nullable|string',
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:50',
            'contact_address' => 'nullable|string|max:255',
            'contact_page_title' => 'nullable|string|max:255',
            'contact_page_subtitle' => 'nullable|string',
            'social_facebook' => 'nullable|url|max:255',
            'social_twitter' => 'nullable|url|max:255',
            'social_instagram' => 'nullable|url|max:255',
            'social_linkedin' => 'nullable|url|max:255',
            'primary_color' => 'nullable|string|max:20',
        ]);

        foreach ($data as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value ?? '']
            );
        }

        return redirect()->route('admin.settings.index')->with('success', 'Settings updated successfully.');
    }
}
