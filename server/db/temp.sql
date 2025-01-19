WITH CTE AS (
  SELECT
    *,
    ROW_NUMBER() OVER (PARTITION BY column1, column2, column3 ORDER BY id) AS rn
  FROM requester
)
DELETE FROM requester
WHERE id IN (
  SELECT id
  FROM CTE
  WHERE rn > 1
);
