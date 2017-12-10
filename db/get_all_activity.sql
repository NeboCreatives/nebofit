select * from activity
where user_id = $1
order by date desc