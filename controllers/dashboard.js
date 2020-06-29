module.exports.dashboard = function(request, response){
    response.render('dashboard',{
        name: request.user.name
    });
}