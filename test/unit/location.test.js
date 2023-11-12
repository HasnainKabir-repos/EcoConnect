const chai = require('chai');
const assert = chai.assert;
const {extractLongLat} = require('../../backend/controller/location.controller');

describe('Extract Longitude and Latitude', () => {
  it('should extract latitude and longitude from valid data', () => {
    const testData = {
      result: {
        geometry: {
          location: {
            lat: 40.7128,
            lng: -74.0060,
          },
        },
      },
    };

    const result = extractLongLat(testData);

    assert.strictEqual(result.lat, 40.7128);
    assert.strictEqual(result.lng, -74.0060);
  });

});
