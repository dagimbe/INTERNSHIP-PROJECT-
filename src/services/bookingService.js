const Booking = require('../models/booking.model');
const Address = require('../models/addresses.model');
const Property = require('../models/property.model');
const Payment = require('../models/payment.model');

// Service functions
module.exports = {
    async createBooking(bookingData, user) {
        try {
            const { propertyId, buyerAddressId, sellerAddressId, items, paymentId, transactionType } = bookingData;

            // Validate Property
            const property = await Property.findById(propertyId);
            if (!property) {
                throw new Error('Property not found');
            }

            // Validate Addresses
            const buyerAddress = await Address.findById(buyerAddressId);
            const sellerAddress = await Address.findById(sellerAddressId);
            const propertyStatus =await Property.findById(propertyId)

            if (!buyerAddress || !sellerAddress) {
                throw new Error('Address not found');
            }

            // Check User
            if (!user || !user._id) {
                throw new Error('User ID is missing');
            }
            if (propertyStatus) {
                const currentProperty = await Property.findById(property._id);
    
                if (!currentProperty) {
                    throw new Error('Property not found');
                }
    
                if (currentProperty.propertyStatus !== 'Available' && currentProperty.propertyStatus !== 'Rejected') {
                    throw new Error('Property is already booked or not available');
                } 
            }

            // Calculate total price
            let totalPrice = 0;
            for (const item of items) {
                if (!item.price || isNaN(item.price)) {
                    throw new Error(`Invalid price for item: ${JSON.stringify(item)}`);
                }
                totalPrice += item.price; // Adjust according to your calculation
            }

            // Create the booking
            const booking = new Booking({
                user: user._id,
                property: propertyId,
                totalAmount: totalPrice,
                bookingStatus: 'Pending',
                buyerAddress: buyerAddressId,
                sellerAddress: sellerAddressId,
                items: items, // Directly use the items array
                payment: paymentId,
                totalItems: items.length,
                transactionType,
                totalPrice
            });

            const savedBooking = await booking.save();
            return savedBooking;
        } catch (error) {
            console.error("Error creating booking:", error.message);
            throw new Error(`Failed to create booking: ${error.message}`);
        }
    },

    async getBookingById(bookingId) {
        try {
            const booking = await Booking.findById(bookingId)
                .populate('user')
                .populate('property')
                .populate('buyerAddress')
                .populate('sellerAddress')
                .populate('payment');
                
            if (!booking) {
                throw new Error('Booking not found');
            }
            return booking;
        } catch (error) {
            throw new Error(`Failed to get booking: ${error.message}`);
        }
    },

    async  updateBooking(bookingId, updates) {
        try {
            // Update the booking and get the updated booking
            const booking = await Booking.findByIdAndUpdate(bookingId, updates, { new: true }).populate('property');
        
            if (!booking) {
                throw new Error('Booking not found');
            }
   
            const { bookingStatus, transactionType, property } = booking;
            let propertyStatus;
            if (bookingStatus === 'Confirmed') {
                if (transactionType === 'Buy') {
                    propertyStatus = 'Sold';
                } else if (transactionType === 'Rent') {
                    propertyStatus = 'Rented';
                }
            }
    
        
            if (propertyStatus && property) {
                console.log(`Updating property with ID: ${property._id} to status: ${propertyStatus}`);
                
                const updatedProperty = await Property.findByIdAndUpdate(
                    property._id,
                    { $set: { propertyStatus } },
                    { new: true }
                );
    
                if (!updatedProperty) {
                    throw new Error(`Property with ID ${property._id} not found`);
                }
    
                console.log('Property updated successfully:', updatedProperty);
            }
        
            return booking;
        } catch (error) {
            console.error(`Failed to update booking: ${error.message}`);
            throw new Error(`Failed to update booking: ${error.message}`);
        }
    }
    
,

    async deleteBooking(bookingId) {
        try {
            const booking = await Booking.findByIdAndDelete(bookingId);
            if (!booking) {
                throw new Error('Booking not found');
            }
            return { message: 'Booking deleted successfully' };
        } catch (error) {
            throw new Error(`Failed to delete booking: ${error.message}`);
        }
    },

    async getBookingsByUser(userId) {
        try {
            const bookings = await Booking.find({ user: userId })
                .populate('property')
                .populate('buyerAddress')
                .populate('sellerAddress')
                .populate('payment');
            return bookings;
        } catch (error) {
            throw new Error(`Failed to get bookings for user: ${error.message}`);
        }
    },

    async getBookingsByProperty(propertyId) {
        try {
            const bookings = await Booking.find({ property: propertyId })
                .populate('user')
                .populate('buyerAddress')
                .populate('sellerAddress')
                .populate('payment');
            return bookings;
        } catch (error) {
            throw new Error(`Failed to get bookings for property: ${error.message}`);
        }
    },

    async getAllBookings() {
        try {
            const bookings = await Booking.find()
                .populate('user')
                .populate('property')
                .populate('buyerAddress')
                .populate('sellerAddress')
                .populate('payment');
            return bookings;
        } catch (error) {
            throw new Error(`Failed to get all bookings: ${error.message}`);
        }
    }
};
