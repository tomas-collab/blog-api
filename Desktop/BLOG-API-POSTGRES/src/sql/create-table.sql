
	 DROP TABLE IF EXISTS public.blogs CASCADE;
	 DROP TABLE IF EXISTS public.authors CASCADE;

CREATE TABLE 
      IF NOT EXISTS
	  authors(
        author_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		name VARCHAR NOT NULL,
		last_name  VARCHAR NOT NULL,
		avatar VARCHAR NOT NULL,
		careated_at TIMESTAMPTZ DEFAULT NOW(),
		updated_at TIMESTAMPTZ DEFAULT NOW()
		);




CREATE TABLE 
       IF NOT EXISTS
        blogs(
            blog_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            title VARCHAR(255) NOT NULL,
            category VARCHAR (50) NOT NULL,
            content TEXT NOT NULL,
            author_id INT REFERENCES authors ON DELETE CASCADE,
            read_time_unit VARCHAR(10) NOT NULL,
            read_time_value VARCHAR(10) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()


        );