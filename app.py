from flask import Flask, request, jsonify
from flask import render_template
import MySQLdb
import os
from werkzeug.utils import secure_filename
from flask import send_from_directory

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'lms'

db = MySQLdb.connect(
        host='localhost',
        user='root',
        passwd='root',
        db='lms'
    )

@app.route('/')
def home():
    return render_template('./home.html')

@app.route('/workland_s')
def workland_s():
    return render_template('./workland_s.html')

@app.route('/workland_m')
def workland_m():
    return render_template('./workland_m.html')

@app.route('/login-submit', endpoint='login-submit', methods=['GET', 'POST'])
def login():
    uid=str(request.form.get('uid'))
    password=str(request.form.get('password'))

    cursor = db.cursor()
    cursor.execute("select password, ustatus from user where uid = %s", (uid,))
    data = cursor.fetchall()
    cursor.close()

    if (len(data) and len(data[0]) and data[0][0] == password and data[0][1] == 0):
        return "success s"
    elif len(data) and len(data[0]) and data[0][0] == password and data[0][1] == 1 :
        return "success m"
    elif (not len(data) or not len(data[0])):
        return "nregistered"
    else:
        return "nequal"

@app.route('/register-submit', endpoint='register-submit', methods=['GET', 'POST'])
def register():
    uid=str(request.form.get('uid'))
    name=str(request.form.get('name'))
    sex=str(request.form.get('sex'))
    if(sex == "male"):   sex_c = 1
    else:   sex_c = 0
    institution=str(request.form.get('institution'))
    phone=str(request.form.get('phone'))
    password=str(request.form.get('password'))
    

    if(len(uid) != 10):
        return "uid长度需为10"

    try:
        cursor = db.cursor()
        cursor.execute("START TRANSACTION")  # 开始事务
        cursor.execute("insert into user(uid,uname,sex,password,institution,phone_number) values (%s,%s,%s,%s,%s,%s);", (uid,name,sex_c,password,institution,phone))
        # 插入日志信息
        cursor.execute("insert into logs (uid, action) VALUES (%s, %s)", (uid, 'User registered'))
        db.commit()
        cursor.close()
        return "注册成功"
    except Exception as e:
        print(str(e))
        db.rollback()
        return "注册失败"
    
@app.route('/user-query-all', endpoint='user-query-all', methods=['GET', 'POST'])
def queryall():
    try:
        cursor = db.cursor()
        cursor.execute("select * from book1;")
        data = cursor.fetchall()
        cursor.close()

        return list(data)
        
    except Exception as e:
        print(str(e))
        return "查询失败"
    
@app.route('/user-query', endpoint='user-query', methods=['GET', 'POST'])
def userquery():
    bname=str(request.form.get('bname'))
    try:
        cursor = db.cursor()
        cursor.execute("select * from book1 where bname like %s;", ('%'+bname+'%',))
        data = cursor.fetchall()
        cursor.close()

        return list(data)
        
    except Exception as e:
        print(str(e))
        return "查询失败"
    
@app.route('/query-user-borrow', endpoint='query-user-borrow', methods=['GET', 'POST'])
def queryuserborrow():
    uid=str(request.form.get('uid'))
    try:
        cursor = db.cursor()
        cursor.execute("select book_ID, bname, borrow_Date, return_Date, overdue_Date, is_overdued from borrow, book1 where bid = book_ID and reader_ID = %s;", (uid,))
        data = cursor.fetchall()
        cursor.close()
        return list(data)
        
    except Exception as e:
        print(str(e))
        return "查询失败"
    
@app.route('/query-all-borrow', endpoint='query-all-borrow', methods=['GET', 'POST'])
def queryallborrow():
    try:
        cursor = db.cursor()
        cursor.execute("select reader_ID, uname, book_ID, bname, borrow_Date, return_Date, overdue_Date, is_overdued from borrow, book1, user where bid = book_ID and uid = reader_ID;")
        data = cursor.fetchall()
        cursor.close()
        return list(data)
        
    except Exception as e:
        print(str(e))
        return "查询失败"
    
@app.route('/query-user-reserve', endpoint='query-user-reserve', methods=['GET', 'POST'])
def queryuserreserve():
    uid=str(request.form.get('uid'))
    try:
        cursor = db.cursor()
        cursor.execute("select book_ID, bname, reserve_Date from reserve, book1 where bid = book_ID and reader_ID = %s;", (uid,))
        data = cursor.fetchall()
        cursor.close()
        return list(data)
        
    except Exception as e:
        print(str(e))
        return "查询失败"
    
@app.route('/query-all-reserve', endpoint='query-all-reserve', methods=['GET', 'POST'])
def queryallreserve():
    try:
        cursor = db.cursor()
        cursor.execute("select reader_ID, uname, book_ID, bname, reserve_Date from reserve, book1, user where bid = book_ID and reader_ID = uid;")
        data = cursor.fetchall()
        cursor.close()
        return list(data)
        
    except Exception as e:
        print(str(e))
        return "查询失败"
    
@app.route('/query-user-overdue', endpoint='query-user-overdue', methods=['GET', 'POST'])
def queryuseroverdue():
    uid=str(request.form.get('uid'))
    try:
        cursor = db.cursor()
        cursor.execute("select book_ID, bname, overdue_Time, dedit from overdue, book1 where bid = book_ID and reader_ID = %s;", (uid,))
        data = cursor.fetchall()
        cursor.close()
        return list(data)
        
    except Exception as e:
        print(str(e))
        return "查询失败"
    
@app.route('/query-all-overdue', endpoint='query-all-overdue', methods=['GET', 'POST'])
def queryalloverdue():
    try:
        cursor = db.cursor()
        cursor.execute("select reader_ID, uname, book_ID, bname, overdue_Time, dedit from overdue, book1, user where bid = book_ID and reader_ID = uid;")
        data = cursor.fetchall()
        cursor.close()
        return list(data)
        
    except Exception as e:
        print(str(e))
        return "查询失败"
    
@app.route('/user-borrow', endpoint='user-borrow', methods=['GET', 'POST'])
def userborrow():
    uid=str(request.form.get('uid'))
    bid=str(request.form.get('bid'))
    try:
        cursor = db.cursor()
        cursor.execute("START TRANSACTION")  # 开始事务
        cursor.callproc('borrowBook1', [uid, bid])
        data = cursor.fetchall()
        # 插入日志信息
        cursor.execute("insert into logs (uid, action) VALUES (%s, %s)", (uid, 'User borrow '+bid))
        db.commit()
        cursor.close()
        return "借阅成功"
        
    except Exception as e:
        print(str(e))
        db.rollback()
        return "借阅失败"
    
@app.route('/user-reserve', endpoint='user-reserve', methods=['GET', 'POST'])
def userreserve():
    uid=str(request.form.get('uid'))
    bid=str(request.form.get('bid'))
    try:
        cursor = db.cursor()
        cursor.execute("START TRANSACTION")  # 开始事务
        cursor.execute("insert into reserve(reader_ID,book_ID,reserve_Date) values(%s,%s,curdate());", (uid,bid))
        data = cursor.fetchall()
        # 插入日志信息
        cursor.execute("insert into logs (uid, action) VALUES (%s, %s)", (uid, 'User reserve '+bid))
        db.commit()
        cursor.close()
        #print(data)
        return "预约成功"
        
    except Exception as e:
        print(str(e))
        db.rollback()
        return "预约失败"
    
@app.route('/user-cancel', endpoint='user-cancel', methods=['GET', 'POST'])
def usercancel():
    uid=str(request.form.get('uid'))
    bid=str(request.form.get('bid'))
    try:
        cursor = db.cursor()
        cursor.execute("START TRANSACTION")  # 开始事务
        cursor.execute("delete from reserve where reader_ID = %s and book_ID = %s;", (uid,bid))
        data = cursor.fetchall()
        # 插入日志信息
        cursor.execute("insert into logs (uid, action) VALUES (%s, %s)", (uid, 'User cancel '+bid))
        db.commit()
        cursor.close()
        #print(data)
        return "取消预约成功"
        
    except Exception as e:
        print(str(e))
        db.rollback()
        return "取消预约失败"
    
@app.route('/user-return', endpoint='user-return', methods=['GET', 'POST'])
def userreturn():
    uid=str(request.form.get('uid'))
    bid=str(request.form.get('bid'))
    try:
        cursor = db.cursor()
        cursor.execute("START TRANSACTION")  # 开始事务
        cursor.callproc('returnBook', [uid, bid])
        data = cursor.fetchall()
        # 插入日志信息
        cursor.execute("insert into logs (uid, action) VALUES (%s, %s)", (uid, 'User return '+bid))
        db.commit()
        cursor.close()
        #print(data)
        return "还书成功"
    except Exception as e:
        print(str(e))
        db.rollback()
        return "还书失败"
    
@app.route('/book-count', endpoint='book-count', methods=['GET', 'POST'])
def bookcount():
    try:
        cursor = db.cursor()
        cursor.execute("select bookNum();")
        data = cursor.fetchone()
        cursor.close()
        #print(data)
        return str(data[0])
    except Exception as e:
        print(str(e))
        return "统计失败"
    
@app.route('/book-delete', endpoint='book-delete', methods=['GET', 'POST'])
def bookdelete():
    uid=str(request.form.get('uid'))
    bid=str(request.form.get('bid'))
    try:
        cursor = db.cursor()
        cursor.execute("START TRANSACTION")  # 开始事务
        cursor.callproc('deleteBook', [bid])
        data = cursor.fetchall()
        # 插入日志信息
        cursor.execute("insert into logs (uid, action) VALUES (%s, %s)", (uid, 'Manager delete '+bid))
        db.commit()
        cursor.close()
        #print(data)
        return "删除成功"
        
    except Exception as e:
        print(str(e))
        db.rollback()
        return "删除失败"
    
@app.route('/book-update', endpoint='book-update', methods=['GET', 'POST'])
def bookupdate():
    uid=str(request.form.get('uid'))
    bid=str(request.form.get('bid'))
    bname=str(request.form.get('bname'))
    author=str(request.form.get('author'))
    deposit=str(request.form.get('deposit'))
    if 'picture' in request.files:
        file = request.files['picture']
        if file.filename == '':
            picture = ''
        else:
            if file:
                filename = secure_filename(file.filename)
                picture = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(picture)
    else:
        picture = ''
    #print(picture)
    try:
        cursor = db.cursor()
        cursor.execute("START TRANSACTION")  # 开始事务
        if picture == '':
            cursor.execute("update book1 set bid = %s, bname = %s, author = %s, deposit = %s where bid = %s", (bid,bname,author,deposit,bid))
        else:
            cursor.execute("update book1 set bid = %s, bname = %s, author = %s, deposit = %s, picture = %s where bid = %s", (bid,bname,author,deposit,picture,bid))
        
        # 插入日志信息
        cursor.execute("insert into logs (uid, action) VALUES (%s, %s)", (uid, 'Manager update '+bid))
        db.commit()
        cursor.close()
        
        return jsonify({'success': True, 'file_path': picture})
        
    except Exception as e:
        print(str(e))
        db.rollback()
        return jsonify({'success': False, 'error': str(e)})
    
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/book-add', endpoint='book-add', methods=['GET', 'POST'])
def bookadd():
    uid=str(request.form.get('uid'))
    bid=str(request.form.get('bid'))
    bname=str(request.form.get('bname'))
    author=str(request.form.get('author'))
    deposit=str(request.form.get('deposit'))
    if 'picture' in request.files:
        file = request.files['picture']
        if file.filename == '':
            picture = ''
        else:
            if file:
                filename = secure_filename(file.filename)
                picture = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(picture)
    else:
        picture = ''
    #print(picture)
    try:
        cursor = db.cursor()
        cursor.execute("START TRANSACTION")  # 开始事务
        if picture == '':
            cursor.execute("insert into book1(bid,bname,author,deposit) values(%s,%s,%s,%s)", (bid,bname,author,deposit))
        else:
            cursor.execute("insert into book1(bid,bname,author,deposit,picture) values(%s,%s,%s,%s,%s)", (bid,bname,author,deposit,picture))
        
        # 插入日志信息
        cursor.execute("insert into logs (uid, action) VALUES (%s, %s)", (uid, 'Manager insert '+bid))
        db.commit()
        cursor.close()
        
        return jsonify({'success': True, 'file_path': picture})
        
    except Exception as e:
        print(str(e))
        db.rollback()
        return jsonify({'success': False, 'error': str(e)})
    
if __name__ == "__main__":
    app.config["JSON_AS_ASCII"] = False
    app.run(host='0.0.0.0', port='8080', debug=True)