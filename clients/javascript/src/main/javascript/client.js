/*
 * Copyright 2013 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Eclipse Public License version 1.0, available at http://www.eclipse.org/legal/epl-v10.html
 */
var mBoss = function() {
  if (arguments.length >= 2) {
    this._host = arguments[0];
    this._port = arguments[1];
    this._secure = arguments.length == 3 ? arguments[2] : false;
  } else {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++)  {
      if (scripts[i].src.match(/.*mboss\.js/)) {
        var url = scripts[i].src;
        var t = url.split('/');
        this._secure = t[0] == 'https:';
        t = t[2].split(':');
        this._host = t[0];
        this._port = parseInt(t[1]);
      }
    }
  }

  this.stomp_client = new Stomp.Client( this._host, this._port, this._secure );
  this.auth = new Keycloak(this._host, this._port + 1, this._secure);
}

mBoss.prototype = {

  connect: function(callback) {
    this.stomp_client.connect( callback );
  },

  create: function(path, data) {
    console.debug( "INSIDE CREATE" );
    $.ajax( path, {
      type: "POST",
      data: JSON.stringify( data ),
      contentType: 'application/json',
      dataType: 'json',
    });
  },

  read: function(path, callback) {
    $.ajax( path, {
      type: "GET", 
      dataType: 'json',
      success: callback,
    } );
  },

  update: function(path, data) {
  },

  delete: function(path) {
  },

  subscribe: function(path, callback) {
    this.stomp_client.subscribe( path, function(msg) {
      var data = JSON.parse( msg.body );
      callback( data );
    } );
  }

}
