<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\Post;
use App\Models\ContactInquiry;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'events_count' => Event::count(),
            'posts_count' => Post::count(),
            'inquiries_count' => ContactInquiry::count(),
            'unread_inquiries' => ContactInquiry::where('is_read', false)->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    }
}
