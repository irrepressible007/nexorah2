<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class LogViewerController extends Controller
{
    public function index()
    {
        $logPath = storage_path('logs/laravel.log');
        $logs = '';

        if (File::exists($logPath)) {
            // Read the last 2000 lines approximately by reading the file backward
            $file = new \SplFileObject($logPath, 'r');
            $file->seek(PHP_INT_MAX);
            $totalLines = $file->key();
            
            $start = max(0, $totalLines - 2000);
            $file->seek($start);
            
            $content = [];
            while (!$file->eof()) {
                $content[] = $file->current();
                $file->next();
            }
            // Reverse so newest is at the top
            $logs = implode("", array_reverse($content));
        } else {
            $logs = 'No log file found.';
        }

        return Inertia::render('Admin/Logs/Index', [
            'logs' => $logs
        ]);
    }

    public function clear()
    {
        $logPath = storage_path('logs/laravel.log');
        if (File::exists($logPath)) {
            File::put($logPath, '');
        }
        
        return back()->with('success', 'Logs cleared successfully.');
    }
}
