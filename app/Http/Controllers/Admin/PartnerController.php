<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PartnerController extends Controller
{
    public function index()
    {
        $partners = Partner::orderBy('display_order')->get();
        return Inertia::render('Admin/Partners/Index', [
            'partners' => $partners
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Partners/Form', [
            'partner' => new Partner()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'website_url' => 'nullable|url|max:255',
            'display_order' => 'integer',
            'logo_image' => 'nullable|image|max:2048', // 2MB Max
        ]);

        if ($request->hasFile('logo_image')) {
            $path = $request->file('logo_image')->store('partners', 'public');
            $validated['logo_image'] = '/storage/' . $path;
        }

        Partner::create($validated);

        return redirect()->route('admin.partners.index')->with('success', 'Partner added successfully.');
    }

    public function edit(Partner $partner)
    {
        return Inertia::render('Admin/Partners/Form', [
            'partner' => $partner
        ]);
    }

    public function update(Request $request, Partner $partner)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'website_url' => 'nullable|url|max:255',
            'display_order' => 'integer',
            'logo_image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('logo_image')) {
            // Delete old logo if it exists
            if ($partner->logo_image) {
                $oldPath = str_replace('/storage/', '', $partner->logo_image);
                if (Storage::disk('public')->exists($oldPath)) {
                    Storage::disk('public')->delete($oldPath);
                }
            }
            
            $path = $request->file('logo_image')->store('partners', 'public');
            $validated['logo_image'] = '/storage/' . $path;
        }

        $partner->update($validated);

        return redirect()->route('admin.partners.index')->with('success', 'Partner updated successfully.');
    }

    public function destroy(Partner $partner)
    {
        if ($partner->logo_image) {
            $oldPath = str_replace('/storage/', '', $partner->logo_image);
            if (Storage::disk('public')->exists($oldPath)) {
                Storage::disk('public')->delete($oldPath);
            }
        }
        
        $partner->delete();
        return redirect()->route('admin.partners.index')->with('success', 'Partner deleted successfully.');
    }
}
