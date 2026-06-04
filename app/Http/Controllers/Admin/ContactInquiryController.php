<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactInquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactInquiryController extends Controller
{
    public function index()
    {
        $inquiries = ContactInquiry::latest()->paginate(20);
        return Inertia::render('Admin/Inquiries/Index', [
            'inquiries' => $inquiries
        ]);
    }

    public function show(ContactInquiry $inquiry)
    {
        // Mark as read when opened
        if ($inquiry->status === 'unread') {
            $inquiry->update(['status' => 'read']);
        }

        return Inertia::render('Admin/Inquiries/Show', [
            'inquiry' => $inquiry
        ]);
    }

    public function destroy(ContactInquiry $inquiry)
    {
        $inquiry->delete();
        return redirect()->route('admin.inquiries.index')->with('success', 'Inquiry deleted successfully.');
    }
}
