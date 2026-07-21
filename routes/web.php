<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Event;
use App\Models\Setting;
use App\Models\Testimonial;

use Illuminate\Support\Facades\Artisan;

Route::get('/run-migrations', function () {
    Artisan::call('migrate', ['--force' => true]);
    return 'Migrations executed successfully!';
});

Route::get('/', function () {
    $upcomingEvents = Event::whereIn('status', ['upcoming', 'draft', 'past'])
        ->orderBy('display_order', 'asc')
        ->orderBy('event_date', 'desc')
        ->take(3)
        ->get();

    $settings = Setting::pluck('value', 'key')->toArray();
    $defaultSettings = [
        'homepage_title' => 'Experience The Grandeur',
        'homepage_subtitle' => 'Nexorah creates breathtaking, unforgettable events. Welcome to the next level of event management.',
        'homepage_cover_url' => 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop',
        'primary_color' => '#ec4899',
    ];
    $settings = array_merge($defaultSettings, $settings);

    $testimonials = Testimonial::orderBy('rating', 'desc')->take(5)->get();
    $partners = \App\Models\Partner::orderBy('display_order')->get();
    $highlights = \App\Models\Highlight::orderBy('display_order')->get();

    $featuredFeeds = \App\Models\FeaturedFeed::with('comments')
        ->where('is_active', true)
        ->orderBy('created_at', 'desc')
        ->take(10)
        ->get();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'events' => $upcomingEvents,
        'settings' => $settings,
        'testimonials' => $testimonials,
        'partners' => $partners,
        'highlights' => $highlights,
        'featuredFeeds' => $featuredFeeds,
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/blog', function () {
    $posts = \App\Models\Post::where('status', 'published')
        ->orderBy('published_at', 'desc')
        ->paginate(12);
        
    $settings = Setting::pluck('value', 'key')->toArray();
    $settings['primary_color'] = $settings['primary_color'] ?? '#ec4899';
        
    return Inertia::render('Blog/Index', [
        'posts' => $posts,
        'settings' => $settings,
        'canLogin' => Route::has('login'),
    ]);
})->name('blog.index');

Route::get('/blog/{slug}', function ($slug) {
    $post = \App\Models\Post::where('slug', $slug)
        ->where('status', 'published')
        ->firstOrFail();
        
    $settings = Setting::pluck('value', 'key')->toArray();
    $settings['primary_color'] = $settings['primary_color'] ?? '#ec4899';
        
    return Inertia::render('Blog/Show', [
        'post' => $post,
        'settings' => $settings,
        'canLogin' => Route::has('login'),
    ]);
})->name('blog.show');

Route::get('/events', function () {
    $events = Event::orderBy('display_order', 'asc')->orderBy('event_date', 'desc')->paginate(12);
    $settings = Setting::pluck('value', 'key')->toArray();
    $settings['primary_color'] = $settings['primary_color'] ?? '#ec4899';
    
    return Inertia::render('Events/Index', [
        'events' => $events,
        'settings' => $settings,
        'canLogin' => Route::has('login'),
    ]);
})->name('events.index');

Route::get('/events/{slug}', function ($slug) {
    $event = Event::with('media')->where('slug', $slug)->firstOrFail();
    
    $settings = Setting::pluck('value', 'key')->toArray();
    $settings['primary_color'] = $settings['primary_color'] ?? '#ec4899';
    
    return Inertia::render('Events/Show', [
        'event' => $event,
        'settings' => $settings,
        'canLogin' => Route::has('login'),
    ]);
})->name('events.show');

Route::get('/about', function () {
    $team = \App\Models\TeamMember::all();
    $faqs = \App\Models\Faq::orderBy('order')->get();
    $partners = \App\Models\Partner::orderBy('display_order')->get();
    
    $settings = Setting::pluck('value', 'key')->toArray();
    $settings['primary_color'] = $settings['primary_color'] ?? '#ec4899';
    
    return Inertia::render('About', [
        'team' => $team,
        'faqs' => $faqs,
        'partners' => $partners,
        'settings' => $settings,
        'canLogin' => Route::has('login'),
    ]);
})->name('about');

Route::get('/contact', function () {
    $settings = Setting::pluck('value', 'key')->toArray();
    $settings['primary_color'] = $settings['primary_color'] ?? '#ec4899';
    
    return Inertia::render('Contact', [
        'settings' => $settings,
        'canLogin' => Route::has('login'),
    ]);
})->name('contact');

Route::post('/contact', function (\Illuminate\Http\Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'subject' => 'required|string|max:255',
        'message' => 'required|string',
    ]);
    
    \App\Models\ContactInquiry::create($validated);
    
    return back()->with('success', 'Your inquiry has been sent successfully. We will get back to you soon.');
})->name('contact.submit');

Route::post('/subscribe', function (\Illuminate\Http\Request $request) {
    $validated = $request->validate([
        'email' => 'required|email|unique:subscribers,email',
    ]);
    
    \App\Models\Subscriber::create($validated);
    
    return back()->with('success', 'Welcome to the Vanguard! You have successfully subscribed.');
})->name('subscribe');

Route::post('/featured-feeds/{featuredFeed}/like', function (\App\Models\FeaturedFeed $featuredFeed) {
    $featuredFeed->increment('likes_count');
    return back();
})->name('featured-feeds.like');

Route::post('/featured-feeds/{featuredFeed}/comment', function (\Illuminate\Http\Request $request, \App\Models\FeaturedFeed $featuredFeed) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'comment' => 'required|string|max:1000',
    ]);
    
    $featuredFeed->comments()->create($validated);
    return back()->with('success', 'Comment posted successfully!');
})->name('featured-feeds.comment');

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\TeamMemberController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\ContactInquiryController;
use App\Http\Controllers\Admin\SettingController;

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::delete('events/media/{media}', [EventController::class, 'destroyMedia'])->name('events.media.destroy');
    // Explicit POST routes for updates to bypass strict cPanel/ModSecurity limitations with PUT/multipart data
    Route::post('events/{event}', [EventController::class, 'update'])->name('events.update.post');
    Route::post('posts/{post}', [PostController::class, 'update'])->name('posts.update.post');
    Route::post('team/{team_member}', [TeamMemberController::class, 'update'])->name('team.update.post');
    Route::post('partners/{partner}', [PartnerController::class, 'update'])->name('partners.update.post');
    Route::post('faqs/{faq}', [FaqController::class, 'update'])->name('faqs.update.post');
    Route::post('testimonials/{testimonial}', [TestimonialController::class, 'update'])->name('testimonials.update.post');
    Route::post('highlights/{highlight}', [\App\Http\Controllers\Admin\HighlightController::class, 'update'])->name('highlights.update.post');
    Route::post('inquiries/{inquiry}', [ContactInquiryController::class, 'update'])->name('inquiries.update.post');
    Route::post('featured-feeds/{featured_feed}', [\App\Http\Controllers\Admin\FeaturedFeedController::class, 'update'])->name('featured-feeds.update.post');

    Route::resource('events', EventController::class);
    Route::resource('posts', PostController::class);
    Route::resource('team', TeamMemberController::class);
    Route::resource('partners', PartnerController::class);
    Route::resource('faqs', FaqController::class);
    Route::resource('testimonials', TestimonialController::class);
    Route::resource('highlights', \App\Http\Controllers\Admin\HighlightController::class);
    Route::resource('inquiries', ContactInquiryController::class);
    Route::resource('featured-feeds', \App\Http\Controllers\Admin\FeaturedFeedController::class);
    Route::resource('subscribers', \App\Http\Controllers\Admin\SubscriberController::class)->only(['index', 'destroy']);
    Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
    Route::post('settings', [SettingController::class, 'update'])->name('settings.update');
    
    Route::get('logs', [\App\Http\Controllers\Admin\LogViewerController::class, 'index'])->name('logs.index');
    Route::post('logs/clear', [\App\Http\Controllers\Admin\LogViewerController::class, 'clear'])->name('logs.clear');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/run-migrations', function () {
    try {
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        return 'Migrations completed: ' . \Illuminate\Support\Facades\Artisan::output();
    } catch (\Exception $e) {
        return 'Error: ' . $e->getMessage();
    }
});

require __DIR__.'/auth.php';
