import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Database, Mail, AlertTriangle } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-primary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: August 28, 2025
            </p>
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              
              {/* Introduction */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Eye className="h-5 w-5 text-primary" />
                    1. Introduction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Peak Gear TO ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our outdoor equipment rental services, visit our website, or interact with us.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    By using our services, you consent to the data practices described in this policy. If you do not agree with the practices described in this policy, please do not use our services.
                  </p>
                </CardContent>
              </Card>

              {/* Information We Collect */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Database className="h-5 w-5 text-primary" />
                    2. Information We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">2.1 Personal Information</h4>
                    <p className="text-muted-foreground leading-relaxed mb-2">
                      We collect personal information that you voluntarily provide when you:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                      <li>Create an account or make a booking</li>
                      <li>Contact us for customer support</li>
                      <li>Sign up for newsletters or marketing communications</li>
                      <li>Complete surveys or provide feedback</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mt-2">
                      This may include: name, email address, phone number, postal address, payment information, and vehicle details.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">2.2 Usage Information</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We automatically collect certain information about your device and how you interact with our website, including IP address, browser type, operating system, referring URLs, and pages visited.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">2.3 Cookies and Tracking Technologies</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and improve our services. You can control cookie preferences through your browser settings.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* How We Use Your Information */}
              <Card>
                <CardHeader>
                  <CardTitle>3. How We Use Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use the information we collect for the following purposes:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Service Delivery</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                        <li>Process and manage bookings</li>
                        <li>Coordinate equipment delivery and pickup</li>
                        <li>Process payments and security deposits</li>
                        <li>Provide customer support</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Communication</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                        <li>Send booking confirmations and updates</li>
                        <li>Respond to inquiries and support requests</li>
                        <li>Send marketing communications (with consent)</li>
                        <li>Notify about service changes or important updates</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Business Operations</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                        <li>Improve our services and website</li>
                        <li>Analyze usage patterns and preferences</li>
                        <li>Prevent fraud and ensure security</li>
                        <li>Comply with legal obligations</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Legal Compliance</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                        <li>Maintain digital waivers and agreements</li>
                        <li>Process insurance claims if necessary</li>
                        <li>Respond to legal requests</li>
                        <li>Enforce our terms of service</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Information Sharing */}
              <Card>
                <CardHeader>
                  <CardTitle>4. How We Share Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:
                  </p>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">4.1 Service Providers</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We may share information with trusted third-party service providers who assist us in operating our business, such as payment processors, delivery partners, and technology service providers.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">4.2 Legal Requirements</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We may disclose your information when required by law, court order, or government regulation, or to protect our rights, property, or safety, or that of others.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">4.3 Business Transfers</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Data Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-primary" />
                    5. Data Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Technical Safeguards</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                        <li>SSL encryption for data transmission</li>
                        <li>Secure database storage</li>
                        <li>Regular security updates and monitoring</li>
                        <li>Access controls and authentication</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Operational Safeguards</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                        <li>Limited employee access to personal data</li>
                        <li>Regular staff training on data protection</li>
                        <li>Incident response procedures</li>
                        <li>Regular security assessments</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-yellow-800">
                        While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data Retention */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Data Retention</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law.
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium text-foreground">Account Information</span>
                      <span className="text-muted-foreground">Until account deletion</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium text-foreground">Booking Records</span>
                      <span className="text-muted-foreground">7 years (for legal/tax purposes)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium text-foreground">Digital Waivers</span>
                      <span className="text-muted-foreground">7 years (legal requirement)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="font-medium text-foreground">Marketing Communications</span>
                      <span className="text-muted-foreground">Until unsubscribed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Your Rights */}
              <Card>
                <CardHeader>
                  <CardTitle>7. Your Privacy Rights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Access and Portability</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Request a copy of the personal information we hold about you in a commonly used format.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Correction</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Request correction of inaccurate or incomplete personal information.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Deletion</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Request deletion of your personal information, subject to legal and business requirements.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Opt-out</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Unsubscribe from marketing communications at any time through email links or by contacting us.
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm mt-4">
                    To exercise these rights, please contact us using the information provided below. We will respond to your request within a reasonable timeframe as required by applicable law.
                  </p>
                </CardContent>
              </Card>

              {/* Third-Party Links */}
              <Card>
                <CardHeader>
                  <CardTitle>8. Third-Party Links and Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We use third-party payment processors (such as PayPal) to handle payment transactions. These services have their own privacy policies and terms of service.
                  </p>
                </CardContent>
              </Card>

              {/* Children's Privacy */}
              <Card>
                <CardHeader>
                  <CardTitle>9. Children's Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you believe we have collected information from a child under 18, please contact us immediately.
                  </p>
                </CardContent>
              </Card>

              {/* Changes to Privacy Policy */}
              <Card>
                <CardHeader>
                  <CardTitle>10. Changes to This Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will post the updated policy on this page with a new "Last updated" date. For significant changes, we may also notify you via email or through our website.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    11. Contact Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Peak Gear TO - Privacy Officer</strong></p>
                    <p>Email: <a href="mailto:info@peakgearto.com" className="text-primary hover:underline">info@peakgearto.com</a></p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm mt-4">
                    We will respond to your privacy-related inquiries within 30 days of receipt.
                  </p>
                </CardContent>
              </Card>

            </div>

            {/* Consent Notice */}
            <div className="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Your Consent</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    By using Peak Gear TO's services, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and disclosure of your personal information as described herein.
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