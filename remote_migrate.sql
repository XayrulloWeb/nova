ALTER TABLE administration ADD COLUMN name JSONB, ADD COLUMN role JSONB, ADD COLUMN "desc" JSONB, ADD COLUMN awards JSONB;
UPDATE administration SET name = jsonb_build_object('uz', name_uz, 'ru', name_ru), role = jsonb_build_object('uz', role_uz, 'ru', role_ru), "desc" = jsonb_build_object('uz', coalesce(desc_uz, ''), 'ru', coalesce(desc_ru, '')), awards = jsonb_build_object('uz', coalesce(awards_uz, ''), 'ru', coalesce(awards_ru, ''));

ALTER TABLE news ADD COLUMN title JSONB, ADD COLUMN content JSONB;
UPDATE news SET title = jsonb_build_object('uz', title_uz, 'ru', title_ru), content = jsonb_build_object('uz', content_uz, 'ru', content_ru);

ALTER TABLE teachers ADD COLUMN name JSONB, ADD COLUMN title JSONB, ADD COLUMN "desc" JSONB, ADD COLUMN tags JSONB, ADD COLUMN subject JSONB;
UPDATE teachers SET name = jsonb_build_object('uz', name_uz, 'ru', name_ru), title = jsonb_build_object('uz', coalesce(title_uz, ''), 'ru', coalesce(title_ru, '')), "desc" = jsonb_build_object('uz', coalesce(desc_uz, ''), 'ru', coalesce(desc_ru, '')), tags = jsonb_build_object('uz', coalesce(tags_uz, ''), 'ru', coalesce(tags_ru, '')), subject = jsonb_build_object('uz', subject_uz, 'ru', subject_ru);
