-- =============================================================
-- Mwalimu AI — Backfill the certificate verification registry
-- Run in the Supabase SQL editor. Safe to run multiple times.
--
-- Some certificates were issued (a serial is printed on them and stored
-- in learning_progress.certificate_serial) before the public `certificates`
-- registry existed, or their fire-and-forget registration insert was lost.
-- Those serials return "not found" at /verify. This recreates the missing
-- registry rows from learning_progress + profiles so every issued
-- certificate verifies. The app also re-registers each user's certificates
-- on login, which keeps titles/names current going forward.
-- =============================================================

INSERT INTO public.certificates (serial, user_id, program_id, program_title, teacher_name, earned_at)
SELECT
  lp.certificate_serial,
  lp.user_id,
  lp.program_id,
  CASE lp.program_id
    WHEN 'cbc-foundations'        THEN 'CBC Foundations'
    WHEN 'assessment-for-learning' THEN 'Assessment for Learning'
    WHEN 'inclusive-education'    THEN 'Inclusive Education'
    WHEN 'stem-integration'       THEN 'STEM Integration'
    WHEN 'teacher-wellbeing'      THEN 'Teacher Wellbeing & Resilience'
    WHEN 'ai-empowered-educator'  THEN 'The AI-Empowered Educator'
    WHEN 'language-teaching'      THEN 'Language Teaching in CBC'
    WHEN 'school-leadership'      THEN 'School Leadership & Management'
    WHEN 'humanities-integration' THEN 'Humanities & Social Studies'
    ELSE ''
  END AS program_title,
  COALESCE(NULLIF(p.name, ''), 'Teacher') AS teacher_name,
  COALESCE(lp.updated_at, NOW())          AS earned_at
FROM public.learning_progress lp
LEFT JOIN public.profiles p ON p.id = lp.user_id
WHERE lp.certificate_serial IS NOT NULL
  AND lp.certificate_serial <> ''
ON CONFLICT (serial) DO NOTHING;

-- ── Verify ──────────────────────────────────────────────────────
-- Counts should now match (every issued serial has a registry row):
SELECT
  (SELECT COUNT(*) FROM public.learning_progress WHERE certificate_serial IS NOT NULL AND certificate_serial <> '') AS issued_serials,
  (SELECT COUNT(*) FROM public.certificates) AS registry_rows;
