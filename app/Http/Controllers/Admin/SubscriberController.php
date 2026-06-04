<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriberController extends Controller
{
    public function index()
    {
        $subscribers = Subscriber::latest()->paginate(20);
        
        return Inertia::render('Admin/Subscribers/Index', [
            'subscribers' => $subscribers
        ]);
    }

    public function destroy(Subscriber $subscriber)
    {
        $subscriber->delete();
        return redirect()->back()->with('success', 'Subscriber removed successfully.');
    }
}
