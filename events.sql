create event if not exists check_overdue
on schedule every 1 day
starts curdate()
do
	update lms.borrow
    set is_overdued = 1
    where overdue_Date < curdate();

create event if not exists update_overdue
on schedule every 1 day
starts curdate()
do
	update lms.overdue
	set overdue_Time = overdue_Time + 1
	where true;
    
create event if not exists insert_overdue
on schedule every 1 day
starts '2024-05-23 00:00:00'
do
	insert into overdue(book_ID, reader_ID, overdue_Time)
	select book_ID, reader_ID, to_days(curdate() - overdue_Date)
    from borrow
    where is_overdued = 1;
    