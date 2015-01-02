Date.prototype.dateToday = function (syntax) {
    // dd-mm-yyyy
    var dateToday = null;

    if (syntax === 'dd-mm-yyyy') {
        dateToday =
           ((this.getDate() < 10) ? '0' + this.getDate() : this.getDate() + '-' +
            (this.getMonth() + 1 < 10) ? '0' + this.getMonth() : this.getMonth() + '-' +
             this.getFullYear()
        );
    } else if (syntax === 'dd/mm/yyy') {
        dateToday =
               ((this.getDate() < 10) ? '0' + this.getDate() : this.getDate() + '/' +
                (this.getMonth() + 1 < 10) ? '0' + this.getMonth() : this.getMonth() + '/' +
                 this.getFullYear()
            );
    } else if (syntax === 'dd-mm-yy') {
        var year = this.getFullYear();

        dateToday =
           ((this.getDate() < 10) ? '0' + this.getDate() : this.getDate() + '-' +
            (this.getMonth() + 1 < 10) ? '0' + this.getMonth() : this.getMonth() + '-' +
             year.substr(2, 2)
        );
    } else if (syntax === 'dd/mm/yy') {
        var year = this.getFullYear();

        dateToday =
           ((this.getDate() < 10) ? '0' + this.getDate() : this.getDate() + '/' +
            (this.getMonth() + 1 < 10) ? '0' + this.getMonth() : this.getMonth() + '/' +
             year.substr(2, 2)
        );
    }
    return dateToday;

};

Date.prototype.timeNow = function (syntax) {
    var timeNow = null;

    if (syntax === 'hh:mm:ss') {
        timeNow =
                      (
                            ((this.getHours() < 10) ? '0' + this.getHours() : this.getHours()) + ':' +
                            ((this.getMinutes() < 10) ? '0' + this.getMinutes() : this.getMinutes()) + ':' +
                            ((this.getSeconds() < 10) ? '0' + this.getSeconds() : this.getSeconds())
                       );
    } else if (syntax === 'hh:mm') {
        timeNow =
                    (
                        ((this.getHours() < 10) ? '0' + this.getHours() : this.getHours()) + ':' +
                        ((this.getMinutes() < 10) ? '0' + this.getMinutes() : this.getMinutes()) + ':' +
                        ((this.getSeconds() < 10) ? '0' + this.getSeconds() : this.getSeconds())
                    );

    } else {
        timeNow =
                    (
                        ((this.getHours() < 10) ? '0' + this.getHours() : this.getHours()) + ':' +
                        ((this.getMinutes() < 10) ? '0' + this.getMinutes() : this.getMinutes()) + ':' +
                        ((this.getSeconds() < 10) ? '0' + this.getSeconds() : this.getSeconds()) + '.' +
                        ((this.getMilliseconds() < 10) ? '0' + this.getMilliseconds() : this.getMilliseconds())
                    );

    }

    return timeNow;
}

Date.prototype.hourNow = function () {
    var hours = ((this.getHours() < 10) ? '0' + this.getHours() : this.getHours());
    return hours;
}

Date.prototype.minuteNow = function () {
    var minutes = ((this.getMinutes() < 10) ? '0' + this.getMinutes() : this.getMinutes());
    return minutes
};

Date.prototype.secondNow = function () {
    var seconds = ((this.getSeconds() < 10) ? '0' + this.getSeconds() : this.getSeconds());
    return seconds;
};

Date.prototype.milisecondsNow = function () {
    var milliseconds = ((this.getMilliseconds() < 10) ? '0' + this.getMilliseconds() : this.getMilliseconds());
    return milliseconds;
};
