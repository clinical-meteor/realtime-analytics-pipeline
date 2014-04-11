randomString = function(len) {
  var chars = "0123456789" +
      "ABCDEFGHIJKLMNOPQRSTUVWXTZ" +
      "abcdefghiklmnopqrstuvwxyz",
    retval = '',
    clen = chars.length;
  len >>>= 0;
  for (var i = 0; i < len; ++i) {
    var rnum = ~~ (Math.random() * clen);
    retval += chars.charAt(rnum);
  }
  return retval;
}

objectIdWithTimestamp = function(timestamp)
{
  // Convert string date to Date object (otherwise assume timestamp is a date)
  if (typeof(timestamp) == 'string') {
    timestamp = new Date(timestamp);
  }

  // Convert date object to hex seconds since Unix epoch
  var hexSeconds = Math.floor(timestamp).toString(16);
  console.log('hexSeconds: ' + hexSeconds);

  // Create an ObjectId with that hex timestamp
  var constructedObjectId = new Meteor.Collection.ObjectID(hexSeconds + '0000000000000');
  console.log('constructedObjectId');
  console.log(constructedObjectId);

  return constructedObjectId;
}