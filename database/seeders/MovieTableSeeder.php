<?php

namespace Database\Seeders;

use App\Models\Movies;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MovieTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $movie = new Movies();
        $movie->title = 'The Shawshank Redemption';
        $movie->slug = 'the-shawshank-redemption';
        $movie->category = json_encode(['Drama', 'Crime']);
        $movie->video_url = "https://www.youtube.com/watch?v=PLl99DlL6b4";
        $movie->thumbnail = "/images/featured-2.png";
        $movie->rating = 4.3;
        $movie->is_featured = true;
        $movie->save();

        $movie2 = new Movies();
        $movie2->title = 'The Godfather';
        $movie2->slug = 'the-godfather';
        $movie2->category = json_encode(['Drama', 'Crime']);
        $movie2->video_url = "https://www.youtube.com/watch?v=sY1S34973zA";
        $movie2->thumbnail = "/images/featured-3.png";
        $movie2->rating = 4.5;
        $movie2->save();

        $movie3 = new Movies();
        $movie3->title = 'The Dark Knight';
        $movie3->slug = 'the-dark-knight';
        $movie3->category = json_encode(['Action', 'Crime', 'Drama']);
        $movie3->video_url = "https://www.youtube.com/watch?v=EXeTwQWrcwY";
        $movie3->thumbnail = "/images/browse-4.png";
        $movie3->rating = 4.4;
        $movie3->save();
    }
}
