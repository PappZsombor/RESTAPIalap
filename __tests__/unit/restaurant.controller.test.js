const restaurantModel = require('../../models/restaurant');
const httpMocks = require('node-mocks-http');
const newRestaurant = require('../mock-data/new-restaurant.json');
const restaurantController = require('../../controllers/restaurant.controller'); 
const allRestaurants = require("../mock-data/all-restaurant.json")

restaurantModel.prototype.save = jest.fn();
restaurantModel.create = jest.fn();
restaurantModel.find = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

describe('RestaurantController.createRestaurant', () => {
    beforeEach(() => {
        req.body = newRestaurant;
    });

    it('should have a createRestaurant function', () => {
        expect(typeof restaurantController.createRestaurant).toBe('function');
    });

    it('should call restaurantModel.save', async () => {
        await restaurantController.createRestaurant(req, res, next);
        expect(restaurantModel.prototype.save).toHaveBeenCalled();
    });

    it('should return 201 response code', async () => {
        restaurantModel.prototype.save.mockReturnValue(newRestaurant);
        await restaurantController.createRestaurant(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });

    it('should return json body in response', async () => {
        restaurantModel.prototype.save.mockReturnValue(newRestaurant);
        await restaurantController.createRestaurant(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newRestaurant);
    });

    it('should handle errors', async () => {
        const errorMessage = { message: 'Error saving restaurant' };
        const rejectedPromise = Promise.reject(errorMessage);
        restaurantModel.prototype.save.mockReturnValue(rejectedPromise);
        await restaurantController.createRestaurant(req, res, next);
        expect(res.statusCode).toBe(400);
        expect(res._getJSONData()).toStrictEqual({ message: 'Error saving restaurant' });
    });
});

describe('restaurantController.getRestaurant', () => {
    it("should have a getRestaurants function", () => {
        expect(typeof restaurantController.getRestaurant).toBe("function");
    });

    if("should call restaurantModel.find({})", async () => {
        await restaurantController.getRestaurant(res, req, next);
        expect(restaurantModel.find).toHaveBeenCalledWith({});
    });

    it("should handle errors in getRestaurants", async () => {
        const errorMessage = {message: "Error finding"}
        const rejectedPromise = Promise.reject(errorMessage)
        restaurantModel.find.mockReturnValue(rejectedPromise)
        await restaurantController.getRestaurant(req, res, next)
        expect(next).toBeCalledWith(errorMessage)
    });
});
