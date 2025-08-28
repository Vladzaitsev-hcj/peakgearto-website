import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Calendar, Shield, AlertTriangle } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Scale className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using Peak Gear TO's rental services.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: August 28, 2025
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              
              {/* Agreement to Terms */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Scale className="h-5 w-5 text-primary" />
                    1. Agreement to Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using Peak Gear TO's rental services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and contributors of content.
                  </p>
                </CardContent>
              </Card>

              {/* Rental Terms */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    2. Rental Terms and Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">2.1 Rental Period</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Rental periods begin at the time of pickup or delivery and end at the agreed return time. Late returns will incur additional daily charges. Early returns do not qualify for refunds.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">2.2 Equipment Condition</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      All equipment is rented in good working condition. You agree to return equipment in the same condition, allowing for normal wear and tear. Any damage beyond normal wear will result in repair charges deducted from your security deposit.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">2.3 Proper Use</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Equipment must be used only for its intended purpose and according to manufacturer specifications. You are responsible for ensuring proper installation and securing of all equipment before use.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* User Responsibilities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    3. User Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">3.1 Age and Legal Capacity</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      You must be at least 18 years of age and legally capable of entering into binding contracts to use our services. By using our services, you represent and warrant that you meet these requirements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">3.2 Accurate Information</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      You agree to provide accurate, current, and complete information during the rental process and to update such information to maintain its accuracy.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">3.3 Vehicle Compatibility</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      You are responsible for ensuring that your vehicle is compatible with the rented equipment and that your vehicle can safely support the equipment and its load.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">3.4 Security and Theft Prevention</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      You are responsible for the security of rented equipment at all times. This includes locking cargo boxes, securing bike carriers, and taking reasonable precautions to prevent theft.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment and Fees */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Payment Terms and Fees</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">4.1 Payment Processing</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      All rental fees, delivery charges, and security deposits must be paid in full at the time of booking. We accept major credit cards and PayPal.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">4.2 Security Deposits</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Security deposits are required for all rentals and will be refunded within 3-5 business days after equipment is returned in satisfactory condition. Deposits may be partially or fully forfeited for damage, loss, or late return.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">4.3 Additional Charges</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Additional charges may apply for late returns, damage, loss, excessive cleaning, or violation of rental terms. You will be notified of any additional charges before they are processed.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Liability and Insurance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-primary" />
                    5. Liability and Insurance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">5.1 Limitation of Liability</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Peak Gear TO's liability is limited to the replacement cost of the rented equipment. We are not liable for any consequential, incidental, or punitive damages arising from the use of our equipment.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">5.2 User Liability</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      You assume full responsibility for any injury, damage, or loss resulting from the use of rented equipment. You agree to indemnify and hold Peak Gear TO harmless from any claims arising from your use of our equipment.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">5.3 Insurance Recommendations</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We strongly recommend checking with your auto insurance provider regarding coverage for rental equipment and any cargo being transported.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Cancellation and Refunds */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Cancellation and Refund Policy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">6.1 Cancellation by Customer</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Rentals may be cancelled free of charge up to 24 hours before the scheduled pickup or delivery time. Cancellations made within 24 hours may incur a service fee.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">6.2 Cancellation by Peak Gear TO</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We reserve the right to cancel rentals due to equipment unavailability, safety concerns, or other circumstances beyond our control. In such cases, full refunds will be provided.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">6.3 Weather-Related Cancellations</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      In case of severe weather conditions that make travel unsafe, we offer flexible rescheduling options at no additional charge.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Privacy and Data Protection */}
              <Card>
                <CardHeader>
                  <CardTitle>7. Privacy and Data Protection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Your privacy is important to us. We collect and use personal information only as described in our Privacy Policy. By using our services, you consent to the collection and use of your information as outlined in our Privacy Policy.
                  </p>
                </CardContent>
              </Card>

              {/* Modifications to Terms */}
              <Card>
                <CardHeader>
                  <CardTitle>8. Modifications to Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Peak Gear TO reserves the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated revision date. Continued use of our services after any such changes constitutes acceptance of the new terms.
                  </p>
                </CardContent>
              </Card>

              {/* Governing Law */}
              <Card>
                <CardHeader>
                  <CardTitle>9. Governing Law</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms of Service are governed by and construed in accordance with the laws of the Province of Ontario, Canada. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts of Ontario.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>10. Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Peak Gear TO</strong></p>
                    <p>Email: hello@peakgearto.com</p>
                    <p>Phone: (416) 555-GEAR</p>
                    <p>Address: Brampton, ON</p>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Acceptance Notice */}
            <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Important Notice</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    By using Peak Gear TO's services, making a booking, or accepting delivery of equipment, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}