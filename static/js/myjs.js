function query_all(data, uid, ustatus) {
    document.getElementById('myhead').innerHTML = '';
    document.getElementById('mytable').innerHTML = '';

    var tr=document.createElement('tr');
    var thbid=document.createElement('th');
    var thbname=document.createElement('th');
    var thauthor=document.createElement('th');
    var thdeposit=document.createElement('th');
    var thbstatus=document.createElement('th');
    var thborrowtimes=document.createElement('th');
    var threservetimes=document.createElement('th');
    var thpicture=document.createElement('th');
    if(ustatus == 0) {
        var thborrow=document.createElement('th');
        var threserve=document.createElement('th');
    }
    else {
        var thupdate=document.createElement('th');
        var thdelete=document.createElement('th');
    }

    thbid.innerHTML = "书籍编号";
    thbname.innerHTML = "书名";
    thauthor.innerHTML = "作者";
    thdeposit.innerHTML = "藏馆";
    thbstatus.innerHTML = "状态";
    thborrowtimes.innerHTML = "借阅次数";
    threservetimes.innerHTML = "预约人数";
    thpicture.innerHTML = "图片";
    if(ustatus == 0) {
        thborrow.innerHTML = "借阅";
        threserve.innerHTML = "预约";
    }
    else {
        thupdate.innerHTML = "修改";
        thdelete.innerHTML = "删除";
    }

    tr.appendChild(thbid);
    tr.appendChild(thbname);
    tr.appendChild(thauthor);
    tr.appendChild(thdeposit);
    tr.appendChild(thbstatus);
    tr.appendChild(thborrowtimes);
    tr.appendChild(threservetimes);
    tr.appendChild(thpicture);
    if(ustatus == 0) {
        tr.appendChild(thborrow);
        tr.appendChild(threserve);
    }
    else {
        tr.appendChild(thupdate);
        tr.appendChild(thdelete);
    }
    var thead=document.getElementById('myhead');
    thead.appendChild(tr);
    
    for(i = 0; i < data.length; i++) {
    
        var tr=document.createElement('tr');
        var tdbid=document.createElement('td');
        var tdbname=document.createElement('td');
        var tdauthor=document.createElement('td');
        var tddeposit=document.createElement('td');
        var tdbstatus=document.createElement('td');
        var tdborrowtimes=document.createElement('td');
        var tdreservetimes=document.createElement('td');
        var tdpicture=document.createElement('td');
        var apicture;
        if(ustatus == 0) {
            var tdborrow=document.createElement('td');
            var tdreserve=document.createElement('td');
        }
        else {
            var tdupdate=document.createElement('td');
            var tddelete=document.createElement('td');
        }

        tdbid.innerHTML = data[i][0];
        tdbid.setAttribute('id', "bid"+String(i));
        tdbname.innerHTML = data[i][1];
        tdauthor.innerHTML = data[i][2];
        tddeposit.innerHTML = data[i][3];
        switch (data[i][4]) {
            case 0:
            tdbstatus.innerHTML = "空闲";
            if(ustatus == 0) {
                tdborrow.innerHTML = "借阅";
                tdborrow.setAttribute('id', "borrow"+String(i));
                tdborrow.setAttribute('style', "cursor:pointer; color:blue;");
                tdreserve.innerHTML = "预约";
                tdreserve.setAttribute('id', "reserve"+String(i));
                tdreserve.setAttribute('style', "cursor:pointer; color:brown;");
            }
            
            break;
            case 1:
            tdbstatus.innerHTML = "已借出";
            if(ustatus == 0) {
                tdreserve.innerHTML = "预约";
                tdreserve.setAttribute('id', "reserve"+String(i));
                tdreserve.setAttribute('style', "cursor:pointer; color:brown;");
                tdborrow.setAttribute('style', 'visibility: hidden;');
            }
            
            break;
            default:
            tdbstatus.innerHTML = "被预约";
            if(ustatus == 0) {
                tdborrow.innerHTML = "借阅";
                tdborrow.setAttribute('id', "borrow"+String(i));
                tdborrow.setAttribute('style', "cursor:pointer; color:blue;");
                tdreserve.innerHTML = "预约";
                tdreserve.setAttribute('id', "reserve"+String(i));
                tdreserve.setAttribute('style', "cursor:pointer; color:brown;");
            }
            
            break;
        }
        if(ustatus == 1) {
            tdbname.setAttribute('id', 'bname' + i);
            tdauthor.setAttribute('id', 'author' + i);
            tddeposit.setAttribute('id', 'deposit' + i);
            tdpicture.setAttribute('id', 'picture' + i);
            tdupdate.innerHTML = "修改";
            tdupdate.setAttribute('id', "update"+String(i));
            tdupdate.setAttribute('style', "cursor:pointer; color:green;");
            tddelete.innerHTML = "删除";
            tddelete.setAttribute('id', "delete"+String(i));
            tddelete.setAttribute('style', "cursor:pointer; color:red;");
        }
        tdborrowtimes.innerHTML = data[i][5];
        tdreservetimes.innerHTML = data[i][6];
        if(data[i][7]) {
            apicture = document.createElement('a');
            apicture.innerHTML = "查看";
            apicture.setAttribute('target', '_blank');
            apicture.href = data[i][7];
            tdpicture.appendChild(apicture);
        }
            

        tr.appendChild(tdbid);
        tr.appendChild(tdbname);
        tr.appendChild(tdauthor);
        tr.appendChild(tddeposit);
        tr.appendChild(tdbstatus);
        tr.appendChild(tdborrowtimes);
        tr.appendChild(tdreservetimes);
        tr.appendChild(tdpicture);
        if(ustatus == 0) {
            tr.appendChild(tdborrow);
            tr.appendChild(tdreserve);
        }
        else {
            tr.appendChild(tdupdate);
            tr.appendChild(tddelete);
        }
        var tbody=document.getElementById('mytable');
        tbody.appendChild(tr);
        
    }

    if(ustatus == 1) {
        // Function to show modal and populate fields
        function showModal(bid, bname, author, deposit, picture) {
            document.getElementById('modalBid').value = bid;
            document.getElementById('modalBname').value = bname;
            document.getElementById('modalAuthor').value = author;
            document.getElementById('modalDeposit').value = deposit;
            document.getElementById('cur_pic').src = picture;
            document.getElementById('editModal').style.display = 'block';
        }

        // Event listener for "修改" button
        document.querySelectorAll('[id^=update]').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var i = btn.id.replace('update', '');
                var bid = document.getElementById('bid' + i).innerText;
                var bname = document.getElementById('bname' + i).innerText;
                var author = document.getElementById('author' + i).innerText;
                var deposit = document.getElementById('deposit' + i).innerText;
                var picture = document.getElementById('picture' + i).getElementsByTagName('a')[0].href;
                showModal(bid, bname, author, deposit, picture);
            });
        });

        // Close modal when clicking on the close button
        document.querySelector('.modal-close').addEventListener('click', function() {
            document.getElementById('editModal').style.display = 'none';
        });

        // Event listener for "加入" button
        const btn = document.getElementById('add_button');
        btn.addEventListener('click', function() {
            document.getElementById('addModal').style.display = 'block';
        });

        // Close modal when clicking on the close button
        document.getElementById('add-close').addEventListener('click', function() {
            document.getElementById('addModal').style.display = 'none';
        });
    }
    
    
    

    for(i = 0; i < data.length; i++) {
        if(ustatus == 0) {
            (function(i) {
                var btn1 = document.getElementById("borrow"+String(i));
                var btn2 = document.getElementById("reserve"+String(i));
                var bid = document.getElementById("bid"+String(i));
                if(btn1) {
                    btn1.onclick = function() {
                        $.ajax({
                            url:"/user-borrow",//要请求的服务器url
                            data: {
                            uid : uid,
                            bid : bid.textContent
                            },
                            async:true,//是否是异步请求
                            cache:false,//是否缓存结果
                            type:"POST",//请求方式
                            success:function(data){//函数会在服务器执行成功后执行，result就是服务器返回结果
                                //alert('submit successfully!');
                                
                                var loading=document.getElementById("loading");
                                loading.removeAttribute('style');
                                loading.setAttribute('style', 'visibility: hidden;');
                                alert(data);
                                
                            },
                            error:function(jqXHR, textStatus, errorThrown) {
                                alert('Error!');
                                var loading=document.getElementById("loading");
                                loading.removeAttribute('style');
                                loading.setAttribute('style', 'visibility: hidden;');
                            }
                        });
                    };
                }
                
                btn2.onclick = function() {
                    $.ajax({
                        url:"/user-reserve",//要请求的服务器url
                        data: {
                        uid : uid,
                        bid : bid.textContent
                        },
                        async:true,//是否是异步请求
                        cache:false,//是否缓存结果
                        type:"POST",//请求方式
                        success:function(data){//函数会在服务器执行成功后执行，result就是服务器返回结果
                            //alert('submit successfully!');
                            
                            var loading=document.getElementById("loading");
                            loading.removeAttribute('style');
                            loading.setAttribute('style', 'visibility: hidden;');
                            alert(data);
                            
                        },
                        error:function(jqXHR, textStatus, errorThrown) {
                            alert('Error!');
                            var loading=document.getElementById("loading");
                            loading.removeAttribute('style');
                            loading.setAttribute('style', 'visibility: hidden;');
                        }
                    });
                };
            })(i)
        }
        else {
            
            (function(i) {
                var btn2 = document.getElementById("delete"+String(i));
                var bid = document.getElementById("bid"+String(i));
                
                btn2.onclick = function() {
                    $.ajax({
                        url:"/book-delete",//要请求的服务器url
                        data: {
                        uid : uid,
                        bid : bid.textContent
                        },
                        async:true,//是否是异步请求
                        cache:false,//是否缓存结果
                        type:"POST",//请求方式
                        success:function(data){//函数会在服务器执行成功后执行，result就是服务器返回结果
                            //alert('submit successfully!');
                            
                            var loading=document.getElementById("loading");
                            loading.removeAttribute('style');
                            loading.setAttribute('style', 'visibility: hidden;');
                            alert(data);
                            
                        },
                        error:function(jqXHR, textStatus, errorThrown) {
                            alert('Error!');
                            var loading=document.getElementById("loading");
                            loading.removeAttribute('style');
                            loading.setAttribute('style', 'visibility: hidden;');
                        }
                    });
                };
                
                
            })(i)
        }
    }
}

function query_borrow(data, uid) {
    document.getElementById('myhead').innerHTML = '';
    document.getElementById('mytable').innerHTML = '';

    var tr=document.createElement('tr');
    var thbid=document.createElement('th');
    var thbname=document.createElement('th');
    var thborrowdate=document.createElement('th');
    var threturndate=document.createElement('th');
    var thoverduedate=document.createElement('th');
    var thisoverdued=document.createElement('th');
    var threturn=document.createElement('th');

    thbid.innerHTML = "书籍编号";
    thbname.innerHTML = "书名";
    thborrowdate.innerHTML = "借阅日期";
    threturndate.innerHTML = "归还日期";
    thoverduedate.innerHTML = "逾期日期";
    thisoverdued.innerHTML = "已逾期";
    threturn.innerHTML = "还书";

    tr.appendChild(thbid);
    tr.appendChild(thbname);
    tr.appendChild(thborrowdate);
    tr.appendChild(threturndate);
    tr.appendChild(thoverduedate);
    tr.appendChild(thisoverdued);
    tr.appendChild(threturn);
    var thead=document.getElementById('myhead');
    thead.appendChild(tr);
    
    for(i = 0; i < data.length; i++) {
    
        var tr=document.createElement('tr');
        var tdbid=document.createElement('td');
        var tdbname=document.createElement('td');
        var tdborrowdate=document.createElement('td');
        var tdreturndate=document.createElement('td');
        var tdoverduedate=document.createElement('td');
        var tdisoverdued=document.createElement('td');
        var tdreturn=document.createElement('td');

        tdbid.innerHTML = data[i][0];
        tdbid.setAttribute('id', "bid"+String(i));
        tdbname.innerHTML = data[i][1];
        tdborrowdate.innerHTML = data[i][2];
        tdreturndate.innerHTML = data[i][3];
        tdoverduedate.innerHTML = data[i][4];
        if(data[i][5] == 1) tdisoverdued.innerHTML = "是";
        else    tdisoverdued.innerHTML = "否";
        if(!data[i][3]) {
            tdreturn.innerHTML = "还书";
            tdreturn.setAttribute('id', "return"+String(i));
            tdreturn.setAttribute('style', "cursor:pointer; color:green;");
        }

        tr.appendChild(tdbid);
        tr.appendChild(tdbname);
        tr.appendChild(tdborrowdate);
        tr.appendChild(tdreturndate);
        tr.appendChild(tdoverduedate);
        tr.appendChild(tdisoverdued);
        tr.appendChild(tdreturn);
        var tbody=document.getElementById('mytable');
        tbody.appendChild(tr);
    }

    for(i = 0; i < data.length; i++) {
            (function(i) {
                var btn = document.getElementById("return"+String(i));
                var bid = document.getElementById("bid"+String(i));
                btn.onclick = function() {
                    $.ajax({
                        url:"/user-return",//要请求的服务器url
                        data: {
                        uid : uid,
                        bid : bid.textContent
                        },
                        async:true,//是否是异步请求
                        cache:false,//是否缓存结果
                        type:"POST",//请求方式
                        success:function(data){//函数会在服务器执行成功后执行，result就是服务器返回结果
                            //alert('submit successfully!');
                            
                            var loading=document.getElementById("loading");
                            loading.removeAttribute('style');
                            loading.setAttribute('style', 'visibility: hidden;');
                            alert(data);
                            
                        },
                        error:function(jqXHR, textStatus, errorThrown) {
                            alert('Error!');
                            var loading=document.getElementById("loading");
                            loading.removeAttribute('style');
                            loading.setAttribute('style', 'visibility: hidden;');
                        }
                    });
                };
            })(i)
        }
        
}

function m_query_borrow(data) {
    document.getElementById('myhead').innerHTML = '';
    document.getElementById('mytable').innerHTML = '';

    var tr=document.createElement('tr');
    var thuid=document.createElement('th');
    var thuname=document.createElement('th');
    var thbid=document.createElement('th');
    var thbname=document.createElement('th');
    var thborrowdate=document.createElement('th');
    var threturndate=document.createElement('th');
    var thoverduedate=document.createElement('th');
    var thisoverdued=document.createElement('th');

    thuid.innerHTML = "用户编号";
    thuname.innerHTML = "用户名";
    thbid.innerHTML = "书籍编号";
    thbname.innerHTML = "书名";
    thborrowdate.innerHTML = "借阅日期";
    threturndate.innerHTML = "归还日期";
    thoverduedate.innerHTML = "逾期日期";
    thisoverdued.innerHTML = "已逾期";

    tr.appendChild(thuid);
    tr.appendChild(thuname);
    tr.appendChild(thbid);
    tr.appendChild(thbname);
    tr.appendChild(thborrowdate);
    tr.appendChild(threturndate);
    tr.appendChild(thoverduedate);
    tr.appendChild(thisoverdued);
    var thead=document.getElementById('myhead');
    thead.appendChild(tr);
    
    for(i = 0; i < data.length; i++) {
    
        var tr=document.createElement('tr');
        var tduid=document.createElement('td');
        var tduname=document.createElement('td');
        var tdbid=document.createElement('td');
        var tdbname=document.createElement('td');
        var tdborrowdate=document.createElement('td');
        var tdreturndate=document.createElement('td');
        var tdoverduedate=document.createElement('td');
        var tdisoverdued=document.createElement('td');

        tduid.innerHTML = data[i][0];
        tduname.innerHTML = data[i][1];
        tdbid.innerHTML = data[i][2];
        tdbid.setAttribute('id', "bid"+String(i));
        tdbname.innerHTML = data[i][3];
        tdborrowdate.innerHTML = data[i][4];
        tdreturndate.innerHTML = data[i][5];
        tdoverduedate.innerHTML = data[i][6];
        if(data[i][7] == 1) tdisoverdued.innerHTML = "是";
        else    tdisoverdued.innerHTML = "否";

        tr.appendChild(tduid);
        tr.appendChild(tduname);
        tr.appendChild(tdbid);
        tr.appendChild(tdbname);
        tr.appendChild(tdborrowdate);
        tr.appendChild(tdreturndate);
        tr.appendChild(tdoverduedate);
        tr.appendChild(tdisoverdued);
        var tbody=document.getElementById('mytable');
        tbody.appendChild(tr);
    }
        
}

function query_reserve(data, uid) {
    document.getElementById('myhead').innerHTML = '';
    document.getElementById('mytable').innerHTML = '';

    var tr=document.createElement('tr');
    var thbid=document.createElement('th');
    var thbname=document.createElement('th');
    var threservedate=document.createElement('th');
    var thcancel=document.createElement('th');

    thbid.innerHTML = "书籍编号";
    thbname.innerHTML = "书名";
    threservedate.innerHTML = "预约日期";
    thcancel.innerHTML = "取消";

    tr.appendChild(thbid);
    tr.appendChild(thbname);
    tr.appendChild(threservedate);
    tr.appendChild(thcancel);
    var thead=document.getElementById('myhead');
    thead.appendChild(tr);
    
    for(i = 0; i < data.length; i++) {
    
        var tr=document.createElement('tr');
        var tdbid=document.createElement('td');
        var tdbname=document.createElement('td');
        var tdreservedate=document.createElement('td');
        var tdcancel=document.createElement('td');

        tdbid.innerHTML = data[i][0];
        tdbid.setAttribute('id', "bid"+String(i));
        tdbname.innerHTML = data[i][1];
        tdreservedate.innerHTML = data[i][2];
        tdcancel.innerHTML = "取消";
        tdcancel.setAttribute('id', "cancel"+String(i));
        tdcancel.setAttribute('style', "cursor:pointer; color:brown;");

        tr.appendChild(tdbid);
        tr.appendChild(tdbname);
        tr.appendChild(tdreservedate);
        tr.appendChild(tdcancel);
        var tbody=document.getElementById('mytable');
        tbody.appendChild(tr);
    }

    for(i = 0; i < data.length; i++) {
        (function(i) {
            var btn = document.getElementById("cancel"+String(i));
            var bid = document.getElementById("bid"+String(i));
            btn.onclick = function() {
                $.ajax({
                    url:"/user-cancel",//要请求的服务器url
                    data: {
                    uid : uid,
                    bid : bid.textContent
                    },
                    async:true,//是否是异步请求
                    cache:false,//是否缓存结果
                    type:"POST",//请求方式
                    success:function(data){//函数会在服务器执行成功后执行，result就是服务器返回结果
                        //alert('submit successfully!');
                        
                        var loading=document.getElementById("loading");
                        loading.removeAttribute('style');
                        loading.setAttribute('style', 'visibility: hidden;');
                        alert(data);
                        
                    },
                    error:function(jqXHR, textStatus, errorThrown) {
                        alert('Error!');
                        var loading=document.getElementById("loading");
                        loading.removeAttribute('style');
                        loading.setAttribute('style', 'visibility: hidden;');
                    }
                });
            };
        })(i)
    }
}

function m_query_reserve(data, uid) {
    document.getElementById('myhead').innerHTML = '';
    document.getElementById('mytable').innerHTML = '';

    var tr=document.createElement('tr');
    var thuid=document.createElement('th');
    var thuname=document.createElement('th');
    var thbid=document.createElement('th');
    var thbname=document.createElement('th');
    var threservedate=document.createElement('th');

    thuid.innerHTML = "用户编号";
    thuname.innerHTML = "用户名";
    thbid.innerHTML = "书籍编号";
    thbname.innerHTML = "书名";
    threservedate.innerHTML = "预约日期";

    tr.appendChild(thuid);
    tr.appendChild(thuname);
    tr.appendChild(thbid);
    tr.appendChild(thbname);
    tr.appendChild(threservedate);
    var thead=document.getElementById('myhead');
    thead.appendChild(tr);
    
    for(i = 0; i < data.length; i++) {
    
        var tr=document.createElement('tr');
        var tduid=document.createElement('td');
        var tduname=document.createElement('td');
        var tdbid=document.createElement('td');
        var tdbname=document.createElement('td');
        var tdreservedate=document.createElement('td');

        tduid.innerHTML = data[i][0];
        tduname.innerHTML = data[i][1];
        tdbid.innerHTML = data[i][2];
        tdbid.setAttribute('id', "bid"+String(i));
        tdbname.innerHTML = data[i][3];
        tdreservedate.innerHTML = data[i][4];

        tr.appendChild(tduid);
        tr.appendChild(tduname);
        tr.appendChild(tdbid);
        tr.appendChild(tdbname);
        tr.appendChild(tdreservedate);
        var tbody=document.getElementById('mytable');
        tbody.appendChild(tr);
    }

}

function query_overdue(data, uid) {
    document.getElementById('myhead').innerHTML = '';
    document.getElementById('mytable').innerHTML = '';

    var tr=document.createElement('tr');
    var thbid=document.createElement('th');
    var thbname=document.createElement('th');
    var thoverduetime=document.createElement('th');
    var thdedit=document.createElement('th');
    var threturn=document.createElement('th');

    thbid.innerHTML = "书籍编号";
    thbname.innerHTML = "书名";
    thoverduetime.innerHTML = "违期时间";
    thdedit.innerHTML = "违金"
    threturn.innerHTML = "还书";

    tr.appendChild(thbid);
    tr.appendChild(thbname);
    tr.appendChild(thoverduetime);
    tr.appendChild(thdedit);
    tr.appendChild(threturn);
    var thead=document.getElementById('myhead');
    thead.appendChild(tr);
    
    for(i = 0; i < data.length; i++) {
    
        var tr=document.createElement('tr');
        var tdbid=document.createElement('td');
        var tdbname=document.createElement('td');
        var tdoverduetime=document.createElement('td');
        var tddedit=document.createElement('td');
        var tdreturn=document.createElement('td');

        tdbid.innerHTML = data[i][0];
        tdbid.setAttribute('id', "bid"+String(i));
        tdbname.innerHTML = data[i][1];
        tdoverduetime.innerHTML = data[i][2];
        tddedit.innerHTML = data[i][3];
        tdreturn.innerHTML = "还书";
        tdreturn.setAttribute('id', "returne"+String(i));
        tdreturn.setAttribute('style', "cursor:pointer; color:green;");

        tr.appendChild(tdbid);
        tr.appendChild(tdbname);
        tr.appendChild(tdoverduetime);
        tr.appendChild(tddedit);
        tr.appendChild(tdreturn);
        var tbody=document.getElementById('mytable');
        tbody.appendChild(tr);
    }

    for(i = 0; i < data.length; i++) {
        (function(i) {
            var btn = document.getElementById("returne" + String(i));
            var bid = document.getElementById("bid" + String(i));
            
            btn.onclick = function() {
                $.ajax({
                    url: "/user-return", // 要请求的服务器url
                    data: {
                        uid: uid,
                        bid: bid.textContent
                    },
                    async: true, // 是否是异步请求
                    cache: false, // 是否缓存结果
                    type: "POST", // 请求方式
                    success: function(data) { // 函数会在服务器执行成功后执行，result就是服务器返回结果
                        var loading = document.getElementById("loading");
                        loading.style.visibility = 'hidden';
                        alert(data);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert('Error!');
                        var loading = document.getElementById("loading");
                        loading.style.visibility = 'hidden';
                    }
                });
            };
        })(i);
    }
    
}

function m_query_overdue(data) {
    document.getElementById('myhead').innerHTML = '';
    document.getElementById('mytable').innerHTML = '';

    var tr=document.createElement('tr');
    var thuid=document.createElement('th');
    var thuname=document.createElement('th');
    var thbid=document.createElement('th');
    var thbname=document.createElement('th');
    var thoverduetime=document.createElement('th');
    var thdedit=document.createElement('th');

    thuid.innerHTML = "用户编号";
    thuname.innerHTML = "用户名";
    thbid.innerHTML = "书籍编号";
    thbname.innerHTML = "书名";
    thoverduetime.innerHTML = "违期时间";
    thdedit.innerHTML = "违金"

    tr.appendChild(thuid);
    tr.appendChild(thuname);
    tr.appendChild(thbid);
    tr.appendChild(thbname);
    tr.appendChild(thoverduetime);
    tr.appendChild(thdedit);
    var thead=document.getElementById('myhead');
    thead.appendChild(tr);
    
    for(i = 0; i < data.length; i++) {
    
        var tr=document.createElement('tr');
        var tduid=document.createElement('td');
        var tduname=document.createElement('td');
        var tdbid=document.createElement('td');
        var tdbname=document.createElement('td');
        var tdoverduetime=document.createElement('td');
        var tddedit=document.createElement('td');

        tduid.innerHTML = data[i][0];
        tduname.innerHTML = data[i][1];
        tdbid.innerHTML = data[i][2];
        tdbid.setAttribute('id', "bid"+String(i));
        tdbname.innerHTML = data[i][3];
        tdoverduetime.innerHTML = data[i][4];
        tddedit.innerHTML = data[i][5];

        tr.appendChild(tduid);
        tr.appendChild(tduname);
        tr.appendChild(tdbid);
        tr.appendChild(tdbname);
        tr.appendChild(tdoverduetime);
        tr.appendChild(tddedit);
        var tbody=document.getElementById('mytable');
        tbody.appendChild(tr);
    }
    
}