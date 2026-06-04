<?php
$dir = __DIR__ . '/database/migrations/';
$files = scandir($dir);

$schemas = [
    'create_settings_table.php' => "\$table->string('key')->unique();\n            \$table->text('value')->nullable();",
    'create_events_table.php' => "\$table->string('title');\n            \$table->string('slug')->unique();\n            \$table->text('description')->nullable();\n            \$table->dateTime('event_date')->nullable();\n            \$table->string('location')->nullable();\n            \$table->string('cover_image')->nullable();\n            \$table->enum('status', ['draft', 'upcoming', 'past'])->default('draft');",
    'create_event_media_table.php' => "\$table->foreignId('event_id')->constrained()->onDelete('cascade');\n            \$table->string('file_path');\n            \$table->string('type')->default('image');",
    'create_posts_table.php' => "\$table->string('title');\n            \$table->string('slug')->unique();\n            \$table->longText('content');\n            \$table->string('featured_image')->nullable();\n            \$table->string('author')->nullable();\n            \$table->timestamp('published_at')->nullable();",
    'create_testimonials_table.php' => "\$table->string('client_name');\n            \$table->string('company')->nullable();\n            \$table->text('quote');\n            \$table->string('avatar')->nullable();",
    'create_team_members_table.php' => "\$table->string('name');\n            \$table->string('role');\n            \$table->text('bio')->nullable();\n            \$table->string('image')->nullable();\n            \$table->json('social_links')->nullable();",
    'create_partners_table.php' => "\$table->string('company_name');\n            \$table->string('logo_image')->nullable();\n            \$table->string('website_url')->nullable();\n            \$table->integer('display_order')->default(0);",
    'create_faqs_table.php' => "\$table->string('question');\n            \$table->text('answer');\n            \$table->integer('order')->default(0);",
    'create_contact_inquiries_table.php' => "\$table->string('name');\n            \$table->string('email');\n            \$table->string('subject')->nullable();\n            \$table->text('message');\n            \$table->boolean('is_read')->default(false);"
];

foreach ($files as $file) {
    if ($file === '.' || $file === '..') continue;
    foreach ($schemas as $key => $schema) {
        if (str_ends_with($file, $key)) {
            $content = file_get_contents($dir . $file);
            $content = preg_replace('/\$table->id\(\);\n/', "\$table->id();\n            " . $schema . "\n", $content);
            file_put_contents($dir . $file, $content);
        }
    }
}
