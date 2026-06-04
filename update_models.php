<?php
$dir = __DIR__ . '/app/Models/';
$files = scandir($dir);

foreach ($files as $file) {
    if (str_ends_with($file, '.php') && $file !== 'User.php') {
        $content = file_get_contents($dir . $file);
        $content = preg_replace('/use HasFactory;\n/', "use HasFactory;\n    protected \$guarded = [];\n", $content);
        file_put_contents($dir . $file, $content);
    }
}
